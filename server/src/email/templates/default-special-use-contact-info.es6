const contactInfo = {
  'name': 'Sue Sherman-Biery',
  'title': 'Special use administrator',
  'phone': '360-854-2660',
  'email': 'sshermanbiery@fs.fed.us'
};

module.exports = `
    Contact us
    *********************************

    If you have questions or need to contact the permit staff at the National Forest Service, please use a method listed below.

    Noncommercial contact
    Name: ${contactInfo.name}
    Title: ${contactInfo.title}
    Phone: ${contactInfo.phone}
    Email: ${contactInfo.email}


    Thank you for your interest in our National Forests.
`;