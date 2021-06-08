import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as nodemail from 'nodemailer';
import CONFIG from "./config";


async function sendMail({mail_to, mail_from, mail_body, mail_cc, mail_bcc, mail_subject}, context: Context) {
    const transporter = nodemail.createTransport(CONFIG.nodemailer);

    const textAsHtml = mail_body.replace(new RegExp('\r?\n', 'g'), '<br />');

    let mailOptions = {
        from: mail_from, // sender address
        to: mail_to, // list of receivers
        cc: mail_cc,
        bcc: mail_bcc,
        subject: mail_subject, // Subject lin
        html: textAsHtml // html body
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        context.log('an error occured' + error);
        return false;
    }
    return true;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.log(req.body.context);

    const sendResult = await sendMail(req.body.input, context);

    const resultBranch = sendResult ? "success" : "fail";

    context.res = {
        status: 200,
        body: {
            choice: resultBranch
        }
    };
};

export default httpTrigger;