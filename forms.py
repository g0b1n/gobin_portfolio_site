from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField, FileField, DateField, IntegerField
from wtforms.validators import InputRequired, Email, EqualTo, Length


class CreateAdminForm(FlaskForm):
    """Create acct form"""

    first_name = StringField("First Name", validators=[InputRequired(message="Name must be entered")])
    last_name = StringField("Last Name", validators=[InputRequired(message="Name must be entered")])
    email = StringField("Email", validators=[InputRequired(message="Email must be entered"), Email()])
    username = StringField("Username", validators=[InputRequired(message="Username must be entered")])
    password = PasswordField("Create Password", validators=[InputRequired(message="Password must be entered")])
    confirm_pwd = PasswordField("Confirm Password", validators=[InputRequired(message="Please confirm password"),
                                EqualTo('password', message='Password must match')])
    pin = StringField("PIN", validators=[InputRequired(message="PIN must be created"), Length(min=4, max=6)])

class AdminLoginForm(FlaskForm):
    """Login form for admin"""

    username = StringField("Username", validators=[InputRequired(message="Username must be entered")])
    password = PasswordField("Password", validators=[InputRequired(message="Password must be entered")])
    pin = StringField("PIN", validators=[InputRequired(message="PIN must be created"), Length(min=4, max=6)])


class AddProjectForm(FlaskForm):
    """Form for adding project"""

    proj_name = StringField("Project Name", validators=[InputRequired(message="Project name must be present")])
    proj_img_url = FileField("Uplode Image", validators=[InputRequired(message="Project image must be present")])
    proj_short_desc = StringField("Short Description", validators=[InputRequired(message="Please provide a short description")])
    proj_start_date = StringField("Start Date", validators=[InputRequired(message="Please provide a short description")])
    proj_end_date = StringField("End Date", validators=[InputRequired(message="Please provide a short description")])
    proj_long_desc = TextAreaField("Long Description", validators=[InputRequired(message="Please provide a short description")])
    proj_process = TextAreaField("Process", validators=[InputRequired(message="What was your process to accomplish this project")])
    proj_challenge = TextAreaField("Challenge", validators=[InputRequired(message="Please provide a challenge faced while doing this project")])
    proj_solution = TextAreaField("Solution", validators=[InputRequired(message="How did you solve the challenge")])
    github_url = StringField("GitHub Link")


class EditProjectForm(FlaskForm):
    """Form for adding/editing project"""

    proj_name = StringField("Project Name", validators=[InputRequired(message="Project name must be present")])
    proj_start_date = StringField("Start Date", validators=[InputRequired(message="Please provide a short description")])
    proj_end_date = StringField("End Date", validators=[InputRequired(message="Please provide a short description")])
    proj_short_desc = StringField("Short Description", validators=[InputRequired(message="Please provide a short description")])
    proj_long_desc = TextAreaField("Long Description", validators=[InputRequired(message="Please provide a short description")])
    proj_process = TextAreaField("Process", validators=[InputRequired(message="What was your process to accomplish this project")])
    proj_challenge = TextAreaField("Challenge", validators=[InputRequired(message="Please provide a challenge faced while doing this project")])
    proj_solution = TextAreaField("Solution", validators=[InputRequired(message="How did you solve the challenge")])
    github_url = StringField("GitHub Link")

    
class AddPhotoForm(FlaskForm):
    """Form for adding photos"""

    client_name = StringField("Client Name", validators=[InputRequired(message="Client name must be present")])
    pic_img_url = FileField("Uplode Image", validators=[InputRequired(message="Please uplode image")])
    pic_event_date = StringField("Event Date", validators=[InputRequired(message="Please add event date")])
    pic_short_desc = StringField("Short Description", validators=[InputRequired(message="Short description must be present")])
    pic_long_desc = TextAreaField("Long Description", validators=[InputRequired(message="Long description must be present")])

class EditPhotoForm(FlaskForm):
    """Form for adding photos"""

    client_name = StringField("Client Name", validators=[InputRequired(message="Client name must be present")])
    pic_img_url = FileField("Uplode Image", validators=[InputRequired(message="Please uplode image")])
    pic_event_date = StringField("Event Date", validators=[InputRequired(message="Please add event date")])
    pic_short_desc = StringField("Short Description", validators=[InputRequired(message="Short description must be present")])
    pic_long_desc = TextAreaField("Long Description", validators=[InputRequired(message="Long description must be present")])

class AddWorkForm(FlaskForm):
    """Form for adding new work"""

    company_name = StringField("Company Name", validators=[InputRequired(message="Company name must be present")])
    position = StringField("Job Title", validators=[InputRequired(message="Job title must be present")])
    company_ph = StringField("Company Phone", validators=[InputRequired(message="Company phone must be present")])
    work_start_date = StringField("Start Date", validators=[InputRequired(message="When do you start the job?")])
    work_end_date = StringField("End Date", validators=[InputRequired(message="When did you left the company")])
    company_street = StringField("Street", validators=[InputRequired(message="Street must be present")])
    company_city = StringField("City", validators=[InputRequired(message="City must be present")])
    company_state = StringField("State", validators=[InputRequired(message="State must be present")])
    company_zip = StringField("Zip", validators=[InputRequired(message="Zip code must be present")])
    work_short_desc = StringField("Short Description", validators=[InputRequired(message="Short Description must be present")])
    work_long_desc = TextAreaField("Long Description", validators=[InputRequired(message="Long description must be present")])

class AddEducationForm(FlaskForm):
    """Form for adding/editing education"""

    school_name = StringField("School Name", validators=[InputRequired(message="Please enter the school name")])
    school_city = StringField("City", validators=[InputRequired(message="Please enter the school name")])
    school_state = StringField("State", validators=[InputRequired(message="Please enter the school name")])
    school_start_date = StringField("Start Date", validators=[InputRequired(message="Please enter the school name")])
    school_end_date = StringField("End Date", validators=[InputRequired(message="Please enter the school name")])
    major_name = StringField("Major")
    degree = StringField("Degree")