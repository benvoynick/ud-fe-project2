/* Global vars */
var HTMLminimizeElement = '<button class="minimizer">-</button>';



/* Functions */

/*
 * Accepts CSS selecters for container of the minimizer button, and selector for the descendants of the container that
 * should be minimized.
 */
function toggleMinimizer(minimizer, entries_selector) {
    var parent = minimizer.parent();
    var entries = parent.find(entries_selector);
    
    if (minimizer.text() === '-') {
        // Minimize
        
        entries.hide();
        minimizer.text('+');
    }
    else {
        //Maximize
        
        entries.show();
        minimizer.text('-');
    }
}

function enableMinimizer(container_selector, entries_selector) {
    var container = jQuery(container_selector);
    var minimizer = container.children('.minimizer');
    
    minimizer.click(function() {
        toggleMinimizer(jQuery(this), entries_selector);
    });
}

function markSectionBlank(id, value, attribute) {
    if (value === undefined) value = 'lime';
    if (attribute === undefined) attribute = 'backgroundColor';
    
    document.getElementById(id).style[attribute] = value;
}

function denoteBlankSections() {
    if(document.getElementsByClassName('flex-item').length === 0) {
        markSectionBlank('topContacts');
    }
    if(document.getElementsByTagName('h1').length === 0) {
        markSectionBlank('header');
    }
    if(document.getElementsByClassName('work-entry').length === 0) {
        markSectionBlank('workExperience');
    }
    if(document.getElementsByClassName('project-entry').length === 0) {
        markSectionBlank('projects');
    }
    if(document.getElementsByClassName('education-entry').length === 0) {
        markSectionBlank('education');
    }
    if(document.getElementsByClassName('flex-item').length === 0) {
        markSectionBlank('letsConnect');
    }
    if(document.getElementById('map') === null) {
        markSectionBlank('mapDiv');
    }
}



var bio = {
    'name' : 'Benjamin Voynick',
    'role' : 'Web Developer',
    'contacts' : {
        'mobile' : '',
        'email' : 'ben.voynick@gmail.com',
        'github' : 'https://github.com/benvoynick/',
        'twitter' : '',
        'blog' : '',
        'location' : 'Falls Church, VA'
    },
    'welcomeMessage' : 'Welcome to my resume!',
    'skills' : [
        'HTML',
        'CSS',
        'JavaScript',
        'PHP',
        'WordPress'
    ],
    'biopic' : 'images/headshot.jpg',
    'display' : function () {
        // Add first elements in reverse order - we're prepending so as to be above the topContacts ul
        if (this.role) {
            jQuery('#header').prepend(HTMLheaderRole.replace('%data%', this.role));
        }
        
        if (this.name) {
            jQuery('#header').prepend(HTMLheaderName.replace('%data%', this.name));
        }
        
        // Contact info
        if (this.contacts) {
            var contactVarNames = ['mobile', 'email', 'github', 'twitter', 'blog', 'location'];
            
            var contactVarNamesLength = contactVarNames.length;
            for (var stdContactVarName = 0; stdContactVarName < contactVarNamesLength; stdContactVarName++) {
                if (this.contacts[contactVarNames[stdContactVarName]]) {
                    var contactInfo = this.contacts[contactVarNames[stdContactVarName]];
                    var formattedContact = window['HTML' + contactVarNames[stdContactVarName]].replace('%data%', contactInfo);
                    jQuery('#topContacts').append(formattedContact);
                }
            }
        }
        
        // Pic and welcome message
        if (this.biopic) {
            jQuery('#header').append(HTMLbioPic.replace('%data%', this.biopic));
        }
        
        // Add skills if present
        if (this.skills) {
            var skillsLength = this.skills.length;
            if (skillsLength) {
                jQuery('#header').append(HTMLskillsStart);
                
                for (var skill = 0; skill < skillsLength; skill++) {
                    jQuery('#skills').append(HTMLskills.replace('%data%', this.skills[skill]));
                }
            }
        }
    }
}

var education = {
    'schools' : [
        {
            'name' : 'Clark University',
            'location' : 'Worcester, MA',
            'degree' : 'Bachelor\'s',
            'majors' : [
                'Sociology'
            ],
            'dates' : '2009',
            'url' : 'http://www.clarku.edu'
        }
    ],
    'onlineCourses' : [
        {
            'title' : 'Front-End Web Developer Nanodegree',
            'school' : 'Udacity',
            'date' : 'Ongoing',
            'url' : 'https://www.udacity.com/course/nd001'
        }
    ],
    'display' : function() {
        var schoolsLength = this.schools.length;
        var onlineCoursesLength = this.onlineCourses.length;
        
        if (schoolsLength || onlineCoursesLength) {
            jQuery('#education').append(HTMLminimizeElement);
            enableMinimizer('#education', '.education-entry');
        }
        
        if (schoolsLength) {
            for (var school = 0; school < schoolsLength; school++){
                var majorsLength = this.schools[school].majors.length;
                var formattedSchoolDegree = HTMLschoolDegree.replace('%data%', this.schools[school].degree);
                var formattedSchoolName = HTMLschoolName.replace('%data%', this.schools[school].name);
                formattedSchoolName = formattedSchoolName.replace('#', this.schools[school].url);
                
                jQuery('#education').append(HTMLschoolStart);
                jQuery('.education-entry:last').append(formattedSchoolName + formattedSchoolDegree);
                jQuery('.education-entry:last').append(HTMLschoolDates.replace('%data%', this.schools[school].dates));
                jQuery('.education-entry:last').append(HTMLschoolLocation.replace('%data%', this.schools[school].location));
                
                if (majorsLength) {
                    for (var major = 0; major < majorsLength; major++) {
                        jQuery('.education-entry:last').append(HTMLschoolMajor.replace('%data%', this.schools[school].majors[major]));
                    }
                }
            }
        }
        
        if (onlineCoursesLength) {
            jQuery('#education').append(HTMLonlineClasses);
            
            for (var onlineCourse = 0; onlineCourse < onlineCoursesLength; onlineCourse++) {
                var formattedCourseSchool = HTMLonlineSchool.replace('%data%', this.onlineCourses[onlineCourse].school);
                var formattedCourseTitle = HTMLonlineTitle.replace('%data%', this.onlineCourses[onlineCourse].title);
                formattedCourseTitle = formattedCourseTitle.replace('#', this.onlineCourses[onlineCourse].url);
                var formattedOnlineURL = HTMLonlineURL.replace('#', this.onlineCourses[onlineCourse].url);
                formattedOnlineURL = formattedOnlineURL.replace('%data%', this.onlineCourses[onlineCourse].url);
                
                jQuery('#education').append(HTMLschoolStart);
                jQuery('.education-entry:last').append(formattedCourseTitle + formattedCourseSchool);
                jQuery('.education-entry:last').append(HTMLonlineDates.replace('%data%', this.onlineCourses[onlineCourse].date));
                jQuery('.education-entry:last').append(formattedOnlineURL);
            }
        }
    }
}

var work = {
    'jobs' : [
        {
            'employer' : 'United Cerebral Palsy',
            'title' : 'Technologist',
            'location' : 'Washington, DC',
            'dates' : 'July 2012-Present',
            'description' : 'At UCP, I wear several hats, acting as web developer and network administrator.'
        }
    ],
    'display' : function() {
            var jobsLength = this.jobs.length;
            
            if (jobsLength) {
                jQuery('#workExperience').append(HTMLminimizeElement);
                enableMinimizer('#workExperience', '.work-entry');
                
                for (var job = 0; job < jobsLength; job++) {
                    jQuery('#workExperience').append(HTMLworkStart);
                    var employerTitle = HTMLworkEmployer.replace('%data%', this.jobs[job].employer) + HTMLworkTitle.replace('%data%', this.jobs[job].title);
                    jQuery('.work-entry:last').append(employerTitle);
                    jQuery('.work-entry:last').append(HTMLworkLocation.replace('%data%', this.jobs[job].location));
                    jQuery('.work-entry:last').append(HTMLworkDates.replace('%data%', this.jobs[job].dates));
                    jQuery('.work-entry:last').append(HTMLworkDescription.replace('%data%', this.jobs[job].description));
                }
            }
    }
}

var projects = {
    'projects' : [
        {
            'title' : 'My Life Without Limits',
            'dates' : 'October 2014-March 2015',
            'description' : 'Custom WordPress theme for United Cerebral Palsy\'s new website.',
            'images' : [
                'images/mylifescreenshot.jpg'
            ]
        }/*,
        {
            'title' : '',
            'dates' : '',
            'description' : '',
            'images' : [
                
            ]
        },*/
    ],
    'display' : function() {
        var projectsLength = this.projects.length;
        
        if (projectsLength) {
            jQuery('#projects').append(HTMLminimizeElement);
            enableMinimizer('#projects', '.project-entry');
            
            for (var project = 0; project < projectsLength; project++) {
                jQuery('#projects').append(HTMLprojectStart);
                jQuery('.project-entry:last').append(HTMLprojectTitle.replace('%data%', this.projects[project].title));
                jQuery('.project-entry:last').append(HTMLprojectDates.replace('%data%', this.projects[project].dates));
                jQuery('.project-entry:last').append(HTMLprojectDescription.replace('%data%', this.projects[project].description));
                
                var imagesLength = this.projects[project].images.length;
                if (imagesLength) {
                    for (var image = 0; image < imagesLength; image++) {
                        jQuery('.project-entry:last').append(HTMLprojectImage.replace('%data%', this.projects[project].images[image]));
                    }
                }
            }
        }
    }
}



bio.display();
work.display();
education.display();
projects.display();
jQuery('#mapDiv').append(googleMap);

denoteBlankSections();

jQuery(document).click(function(loc) {
    logClicks(loc.pageX, loc.pageY);
});