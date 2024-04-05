const { sequelize } = require('../models');
const Sib = require('sib-api-v3-sdk');

const client = Sib.ApiClient.instance;

exports.getForgetPassword = async (req, res) => {
    let transaction;
    try {
        transaction = await sequelize.transaction();

        const userEmail = req.body.email;

        // Set the Sendinblue API key
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.API_KEY;

        // Create an instance of the EmailCampaignsApi
        const tranEmailApi = new Sib.TransactionalEmailsApi();

        const sender = {
            email: 'expensetrackerteam@gmail.com',
        }
        const recipients = [
            {
                email: userEmail,
            }
        ]
        tranEmailApi.sendTransacEmail({
            sender,
            to: recipients,
            subject: 'Password Reset Link',
            htmlContent: `<p>Click on the link below to reset your password</p><a href="http://localhost:3000/reset-password/${userEmail}">Reset Password</a>`,
        }).then(console.log).catch(console.log);

        // Commit the transaction
        await transaction.commit();

        // Send a success response
        res.status(200).json({ message: "Email campaign created successfully" });
    } catch (error) {
        // Rollback the transaction if an error occurs
        if (transaction) await transaction.rollback();

        // Send an error response
        
        res.status(500).json({ error: 'Internal server error' });
    }
};
