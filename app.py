from flask import Flask, render_template, redirect, request, url_for, session, flash, jsonify
from flask_login import LoginManager, login_required, logout_user, login_user
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename
import os
from flask_migrate import Migrate


from models import db, connect_db, AdminUser, Project, Photo, WorkHistory, Education
from forms import CreateAdminForm, AdminLoginForm, AddProjectForm, EditProjectForm, AddPhotoForm, EditPhotoForm, AddWorkForm, AddEducationForm

app = Flask(__name__)

app.config['SECRET_KEY'] = 'myPortfolio_site'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///gobin_db'
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
# postgres://gobindahalportfolio_user:0A0BLOsybCsQMztMosVykx8wZgCchdrh@dpg-cmennqicn0vc73brg5ag-a.oregon-postgres.render.com/gobindahalportfolio

app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['UPLOAD_FOLDER'] = 'static/images'


connect_db(app)
migrate = Migrate(app, db)

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

# Set the login view, which is the route for your login page
login_manager.login_view = 'admin_login'  # Replace 'login' with your login route's function name





@app.route('/')
def home_page():
    """home page for my portfolio"""

    #fetch all projects
    projects = Project.query.limit(3).all()
    photos = Photo.query.limit(3).all()
    works = WorkHistory.query.limit(3).all()
    schools = Education.query.limit(3).all()

    return render_template('home.html', projects=projects, photos=photos,
                           works=works, schools=schools)


@app.route('/about')
def about_page():

    return render_template('about.html')


@app.route('/index')
def index_page():

    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('show/test.html')


#### ADMIN LOGIN PAGE ###

# @app.route('/create-admin', methods=['GET', 'POST'])
# # @login_required
# def create_admin():
#     """Renders and submits a form to create admin"""

#     form = CreateAdminForm()

#     if form.validate_on_submit():
#         first_name = form.first_name.data
#         last_name = form.last_name.data
#         email = form.email.data
#         username = form.username.data
#         password = form.password.data
#         pin = form.pin.data

#         admin = AdminUser.register(first_name, last_name, email, username, password, pin)

#         db.session.add(admin)

#         try:
#             db.session.commit()
#         except IntegrityError:
#             form.username.errors.append('Username already exist, please choose another username')
#             return render_template('admin/create-admin.html', form=form)
        
#         session['admin_users_id'] = admin.id

#         flash(f'{admin}, Successfully Created Your Account!!', 'success')
#         return redirect(url_for('home_page')) #later i will change it to redirect them to the userprofile page
    
#     return render_template('admin/create-admin.html', form=form)



@login_manager.user_loader
def load_user(user_id):
    return AdminUser.query.get(user_id)

@app.route('/admin-login', methods=['GET', 'POST'])
def admin_login():
    """Login page for admin.
    it will render a login page with input fields for:
    username
    password and 
    PIN
    """
    form = AdminLoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        pin = form.pin.data
    # if request.method == 'POST':
        # username = request.form['username']
        # password = request.form['password']
        # pin = request.form['pin']

        admin = AdminUser.authenticate(username, password, pin)

        if admin:
            login_user(admin)
            session['admin_username'] = admin.username  # Storing the username in session
            print("DEBUG: session['admin_username'] =", session['admin_username'])  # Debugging
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Invalid credentials. Please try again.', 'danger')
    
    return render_template('admin/admin-login.html', form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home_page'))



### ROUTES ###
@app.route('/about')
def about():

    return render_template('about.html')


##### ADMIN DASHBOARD #####
@app.route('/admin-dashboard')
@login_required
def admin_dashboard():
    """Shows all the tables that have project/photo/workHistory/education
    and option add/edit/delete
    """

    projects = Project.query.all()
    photos = Photo.query.all()
    works = WorkHistory.query.all()
    schools = Education.query.all()

    return render_template('admin/admin-dashboard.html', projects=projects, photos=photos,
                           works=works, schools=schools)



### ADD PROJECTS ADMIN DASHBOARD ###
@app.route('/projects/add', methods=['GET', 'POST'])
@login_required
def add_project():
    """Renders and submits a form to add new project"""

    form = AddProjectForm()

    if form.validate_on_submit():
        proj_name = form.proj_name.data
        proj_start_date = form.proj_start_date.data
        proj_end_date = form.proj_end_date.data
        proj_short_desc = form.proj_short_desc.data
        proj_long_desc = form.proj_long_desc.data
        proj_process = form.proj_process.data
        proj_challenge = form.proj_challenge.data
        proj_solution = form.proj_solution.data
        github_url = form.github_url.data

        proj_img_url = None #default None

        # Check if the file has been uploded if not process the uploded files
        if 'proj_img_url' in request.files:
            image_file = form.proj_img_url.data
            filename = secure_filename(image_file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(filepath) # Saves file to the UPLOAD_FOLDER

            rel_filepath = os.path.join('images', filename) # Relative path for the db
            # store filepath into db
            proj_img_url = rel_filepath

        new_proj = Project(proj_name=proj_name, proj_img_url=proj_img_url,
                           proj_start_date=proj_start_date, proj_end_date=proj_end_date,
                           proj_short_desc=proj_short_desc, proj_long_desc=proj_long_desc,
                           proj_process=proj_process, proj_challenge=proj_challenge, proj_solution=proj_solution,
                           github_url=github_url)
        
        # add new project to db
        db.session.add(new_proj)

        try:
            db.session.commit()
            flash(f'Project name:{ new_proj}, successcfully added to the database', 'success')
        except IntegrityError as e:
            db.session.rollback()
            flash('An error occurred. Project could not be added.', 'danger')
            app.logger.error(f'Error adding project: {e}')
        
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/add/project.html', form=form)


@app.route('/projects/show')
def show_projects():
    """gets projects form db and shows projects"""

    #fetch all projects
    projects = Project.query.all()

    return render_template('show/show_projects.html', projects=projects)

### Project details ###
@app.route('/projects/<int:project_id>/details')
def project_details(project_id):
    """Show more details about the project"""
    project_details = Project.query.get_or_404(project_id)

    if project_details:
        return render_template('details/proj_details.html', project_details=project_details)
    else:
        return render_template('details/proj_details.html', error="Project Not Found")


### EDIT PROJECTS ###
@app.route('/projects/<int:id>/edit', methods=['GET', 'POST'])
@login_required
def edit_project(id):
    proj = Project.query.get_or_404(id)
    form = EditProjectForm(obj=proj)

    if form.validate_on_submit():
        proj.proj_name = form.proj_name.data
        proj.proj_end_date = form.proj_end_date.data
        proj.proj_short_desc = form.proj_short_desc.data
        proj.proj_short_desc = form.proj_short_desc.data
        proj.proj_long_desc = form.proj_long_desc.data
        proj.proj_process = form.proj_process.data
        proj.proj_challenge = form.proj_challenge.data
        proj.proj_solution = form.proj_solution.data
        proj.github_url = form.github_url.data

        db.session.commit()
        flash('Project updated successfully', 'success')
        return redirect(url_for('admin_dashboard'))

    return render_template('admin/edit/edit_project.html', form=form, proj=proj)

### DELETE PROJECT
@app.route('/projects/<int:project_id>', methods=['POST'])
@login_required
def delete_project(project_id):
    """Delete projects"""

    project = Project.query.get_or_404(project_id)

    db.session.delete(project)
    db.session.commit()
    flash("Project deleted", 'success')

    return redirect(url_for('admin_dashboard'))



### ADD PHOTOS ###
@app.route('/photos/add', methods=['GET', 'POST'])
@login_required
def add_photos():
    """Render and submit form to add new photos"""

    form = AddPhotoForm()

    if form.validate_on_submit():
        client_name = form.client_name.data
        pic_event_date = form.pic_event_date.data
        pic_short_desc = form.pic_short_desc.data
        pic_long_desc =  form.pic_long_desc.data

        pic_img_url = None

        if 'pic_img_url' in request.files:
            image_file = request.files['pic_img_url']
            if image_file:
                filename = secure_filename(image_file.filename)
                filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image_file.save(filepath)
                pic_img_url = os.path.join('images', filename)

            # rel_filepath = os.path.join('images', filename)

            # pic_img_url = rel_filepath
        
        new_photo = Photo(client_name=client_name, pic_event_date=pic_event_date,
                          pic_short_desc=pic_short_desc, pic_long_desc=pic_long_desc,
                          pic_img_url=pic_img_url)
        
        db.session.add(new_photo)

        try:
            db.session.commit()
            flash(f'Photo added successcfully', 'success')
        except IntegrityError as e:
            db.session.rollback()
            flash('An error occurred. Photo could not be added.', 'danger')
            app.logger.error(f'Error adding project: {e}')
        
        return redirect(url_for('admin_dashboard'))
    return render_template('admin/add/photo.html', form=form)

@app.route('/photos/show')
def show_photos():
    """Get photos from db and show photos"""

    # Fetch all photos
    photos = Photo.query.all()

    return render_template('show/show_photos.html', photos=photos)

### Photo Details ###
@app.route('/photo/<int:photo_id>/details')
def photo_details(photo_id):
    """Show more details about photo"""
    photo_details = Photo.query.get_or_404(photo_id)

    if photo_details:
        return render_template('details/photo_details.html', photo_details=photo_details)
    else:
        return render_template('details/photo_details.html', error='Photo Not Found')

### EDIT PHOTOS ###
@app.route('/photos/<int:photo_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_photo(photo_id):

    photos = Photo.query.get_or_404(photo_id)
    form = EditPhotoForm(obj=photos)

    if form.validate_on_submit():
        photos.client_name = form.client_name.data
        photos.pic_short_desc = form.pic_short_desc.data
        photos.pic_long_desc =  form.pic_long_desc.data
        photos.pic_event_date = form.pic_event_date.data

        db.session.commit()
        flash('Photos uploded successfully', 'success')
        return redirect(url_for('admin-dashboard'))
    
    return render_template('admin/edit/edit_photo.html', form=form, photos=photos)

### DELETE PHOTO ###
@app.route('/photo/<int:photo_id>', methods=['POST'])
@login_required
def delete_photo(photo_id):
    """Delete photos"""
    photos = Photo.query.get_or_404(photo_id)

    db.session.delete(photos)
    db.session.commit()
    flash("Photo deleted", 'success')

    return redirect(url_for('admin_dashboard'))


### ADD WORK ###
@app.route('/work/add', methods=['GET', 'POST'])
@login_required
def add_work():
    """Render and submit form to add new work"""

    form = AddWorkForm()

    if form.validate_on_submit():
        company_name = form.company_name.data
        position = form.position.data
        company_ph = form.company_ph.data
        work_start_date = form.work_start_date.data
        work_end_date = form.work_end_date.data
        company_street = form.company_state.data
        company_city = form.company_city.data
        company_state = form.company_state.data
        company_zip = form.company_zip.data
        work_short_desc = form.work_short_desc.data
        work_long_desc = form.work_long_desc.data

        new_work = WorkHistory(company_name=company_name, position=position, company_ph=company_ph,
                               work_start_date=work_start_date, work_end_date=work_end_date, company_street=company_street,
                               company_city=company_city, company_state=company_state,
                               company_zip=company_zip, work_short_desc=work_short_desc,
                               work_long_desc=work_long_desc)
        
        db.session.add(new_work)

        try:
            db.session.commit()
            flash(f'New work added successfully', 'success')
        except IntegrityError as e:
            db.session.rollback()
            flash('An error occurred. Work could not be added.', 'danger')
            app.logger.error(f'Error adding work: {e}')

        return redirect(url_for('admin_dashboard'))
    return render_template('admin/add/work.html', form=form)


### SHOW WORK ###
@app.route('/work/show')
def show_work():
    """Get work details from db and show here"""

    # Fetch all work details
    works = WorkHistory.query.all()

    return render_template('show/show_work.html', works=works)

### EDIT WORK ###
@app.route('/works/<int:work_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_work(work_id):
    """Render form to edit and submit work"""

    works = WorkHistory.query.get_or_404(work_id)
    form = AddWorkForm(obj=works)

    if form.validate_on_submit():
        works.company_name = form.company_name.data
        works.position = form.position.data
        works.company_ph = form.company_ph.data
        works.work_start_date = form.work_start_date.data
        works.work_end_date = form.work_end_date.data
        works.company_street = form.company_street.data
        works.company_city = form.company_city.data
        works.company_state = form.company_state.data
        works.company_zip = form.company_zip.data
        works.work_short_desc = form.work_short_desc.data
        works.work_long_desc = form.work_long_desc.data

        db.session.commit()
        flash('Work info updated successfylly', 'success')
        return redirect(url_for('admin_dashboard'))
    
    return render_template('admin/edit/edit_work.html', form=form, works=works)

### DELETE WORK ###
@app.route('/work/<int:work_id>', methods=['POST'])
@login_required
def delete_work(work_id):
    """Delete work"""

    works = WorkHistory.query.get_or_404(work_id)

    db.session.delete(works)
    db.session.commit()
    flash('Work deteleted successfully', 'success')

    return redirect(url_for('admin_dashboard'))
    
### EDUCATIONS ###
@app.route('/school/add', methods=['GET', 'POST'])
@login_required
def add_school():
    """Render and submit form to add schools"""

    form = AddEducationForm()

    if form.validate_on_submit():
        school_name = form.school_name.data
        school_city = form.school_city.data
        school_state = form.school_state.data
        school_start_date = form.school_start_date.data
        school_end_date = form.school_end_date.data
        major_name = form.major_name.data
        degree = form.degree.data

        new_school = Education(school_name=school_name, school_city=school_city, school_state=school_state,
                               school_start_date=school_start_date, school_end_date=school_end_date,
                               major_name=major_name, degree=degree)
        
        db.session.add(new_school)

        try:
            db.session.commit()
            flash(f"New school added successfully", 'success')
        except IntegrityError as e:
            db.session.rollback()
            flash('An error occurred. Work could not be added.', 'danger')
            app.logger.error(f'Error adding work: {e}')

        return redirect(url_for('admin_dashboard'))
    return render_template('admin/add/school.html', form=form)

### SHOW EDUCATION ###
@app.route('/school/show')
def show_school():
    """Get school details from db and show here"""

    # Fetch school details
    schools = Education.query.all()

    return render_template('show/show_school.html', schools=schools)

### EDIT SCHOOLS ###
@app.route('/school/<int:school_id>/edit', methods=['GET', 'POST'])
@login_required
def edit_school(school_id):
    """Render form to edit and submit school"""

    schools = Education.query.get_or_404(school_id)
    form = AddEducationForm(obj=schools)

    if form.validate_on_submit():
        schools.school_name = form.school_name.data
        schools.school_city = form.school_city.data
        schools.school_state = form.school_state.data
        schools.school_start_date = form.school_start_date.data
        schools.school_end_date = form.school_end_date.data
        schools.major_name = form.major_name.data
        schools.degree = form.degree.data

        db.session.commit()
        flash("School info updated successfully", 'success')
        return redirect(url_for('admin_dashboard'))
    
    return render_template('admin/edit/edit_school.html', form=form, schools=schools)

### DELETE SCHOOL ### 
@app.route('/school/<int:school_id>', methods=['POST'])
@login_required
def delete_school(school_id):
    """Delete school"""

    schools = Education.query.get_or_404(school_id)

    db.session.delete(schools)
    db.session.commit()
    flash(f"{schools}, deleted successfully", 'success')

    return redirect(url_for('admin_dashboard'))