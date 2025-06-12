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
            SuccessMessage : {
                emailSubject: 'Registraion success mail',
                emailBody: `   Welcome {{userName}}, <br /> <br /> 
                                                            You have succesfully registered on <b>Red&Blue </b> for free test. <br /> 
                                                            Below are the Login creadentials to give free test. <br />
                                                            LoginId:  {{userName}} <br />
                                                            Password:  {{pass}} <br /> <br />
                                                            `,
                emailFooter: `Thanks <br />
                                                sherin.fun <br />
                                                
                                                `
            },
            AnotherNotification: {
                emailSubject: 'This is another {{emailtype}} Email',
                emailBody: 'Hello {{userName}},<br/> We are sending you this email on {{sendDate}}, just to check how things are going with {{relativeName}}.<br/>',
                emailFooter: '<br/><br/>Yours Faithfully,<br/><strong>Viotal Works Support Team</strong>'
            }
        }

module.exports = {
    defaultEmailTemplates
}