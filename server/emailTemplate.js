const defaultFooter = `<br /> <br />
<strong>Note </strong>: This is a system generated email communication. Do not reply to this email. <br />
Please write to  <a href='mailto:hpservice@vintechin.in'>hpservice@vintechin.in</a> for any queries or clarifications.<br /><br /> 
Thanks & Regards,<br /> <br /> 
<img src="partnerlogo" style="width: 90px ;"><br />
 Vintech Electronic Systems Pvt Ltd. <br />
 Phone:-02025666233 <br />
 <p>Visit us at : <a href='http://www.vintechin.in'>www.vintechin.in</a></p> <br /> <br />`;


// <br/>Regards, <br/>Vintech Admin team;
const defaultEmailTemplates = {
    SuccessMessage: {
        emailSubject: 'Registraion success mail',
        emailBody: `   Welcome {{userName}}, <br /> <br /> 
                                                            You have succesfully registered on <b>Red&Blue </b> <br /> 
                                                            Below is the OTP  to give verify it's your own stuff. <br />
                                                            OTP:  <h1>{{otp}}</h1> <br />

                                                            `,
        emailFooter: `Thanks <br />
                                                sherin.fun <br />
                                                
                                                `
    },
    AnotherNotification: {
        emailSubject: 'This is another {{emailtype}} Email',
        emailBody: 'Hello {{userName}},<br/> We are sending you this email on {{sendDate}}, just to check how things are going with {{relativeName}}.<br/>',
        emailFooter: '<br/><br/>Yours Faithfully,<br/><strong>Viotal Works Support Team</strong>'
    },
   // Inside your myDefaultTemplates object...

login: {
    type: "visual_otp",
    emailSubject: "Your Secure Login Code",
    emailBody: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; background-color: #f4f4f4;">
            <div style="max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
                <h2 style="margin-top: 0; color: #2c3e50;">Your Secure Code</h2>
                <p style="color: #555;">Enter the circled numbers by following the color order below.</p>
                
                <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-spacing: 10px; margin: 25px auto;">
                    <tbody>
                        {{visual_otp_grid}}
                    </tbody>
                </table>

                <div style="text-align: left; margin-top: 25px; padding-top: 15px; border-top: 1px solid #eeeeee;">
                    <h3 style="font-size: 1em; margin: 0 0 10px 0; color: #2c3e50;">Hello {{userName}} Enter the numbers in this color order:</h3>
                    <div style="line-height: 1.8; font-size: 1.1em;">
                        1st &rarr; <strong style="color: #e74c3c;">Red</strong><br>
                        2nd &rarr; <strong style="color: #3498db;">Blue</strong><br>
                        3rd &rarr; <strong style="color: #2ecc71;">Green</strong><br>
                        4th &rarr; <strong style="color: #f39c12;">Orange</strong>
                    </div>
                </div>
                </div>
        </div>
    `,
    emailFooter: "<p style=\"margin-top: 20px; font-size: 0.8em; color: #888;\">This code expires in 5 minutes.</p>"
},

// ... your other templates like "welcome-user",
    "welcome-user": {
        // This standard template remains the same
        emailSubject: "Welcome, {{userName}}!",
        emailBody: "Hi {{userName}}, thanks for joining!"
    }
}

module.exports = {
    defaultEmailTemplates
}