import sgMail from '@sendgrid/mail';
import config from '../../../config/environment';
import Logger from '../Logger';

const formatData = (data) => {
    const totalDonations = data.length;
    let totalAnonymous = 0;
    let totalValueDonations = 0;
    data.forEach(item => {
        totalValueDonations += item.amount;
        if (item.name === 'Anonymous') {
            totalAnonymous += 1;
        }
    });
    totalValueDonations = totalValueDonations.toLocaleString("en-US", { 
        style: "currency", 
        currency: "USD"
    });
    const percentAnonymous = (totalAnonymous * 100) / totalDonations;
    return { totalDonations, totalValueDonations, percentAnonymous };
}

export const sendMail = async (data) => {
    const { 
        totalDonations,
        totalValueDonations,
        percentAnonymous
    } = formatData(data);
    const token = config.sendGrid.token;
    const sender = config.sendGrid.sender;
    const receiver = config.sendGrid.receiver;
    sgMail.setApiKey(token);
    const msg = {
      to: receiver,
      from: sender,
      subject: 'Donation file imported successfully',
      html: `<p>UHUUU, we received your import request with ${totalDonations} records and it is already in our database, and the coolest thing is knowing that this was totaled in a value of <strong>${totalValueDonations}</strong> from the spreadsheet imported into our system.</p></br></br>Percentage of anonymous donors: <strong>${percentAnonymous}%</strong></br></br><span>Thank you!</span>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        Logger.info(`Email sent to ${receiver}`)
      })
      .catch((error) => {
        Logger.error(error.response)
      })
}