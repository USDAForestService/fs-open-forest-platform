const contactInfo = {
  'name': 'Sue Sherman-Biery',
  'title': 'Special use administrator',
  'phone': '360-854-2660',
  'email': 'sshermanbiery@fs.fed.us'
};

module.exports = {
  text: `
    Contact us
    *********************************

    If you have questions or need to contact the\
 permit staff at the National Forest Service, please use a method listed below.

    Contact
    Name: ${contactInfo.name}
    Title: ${contactInfo.title}
    Phone number: ${contactInfo.phone}
    Email: ${contactInfo.email}


    Thank you for your interest in our National Forests.
`,
  html: `
  <h2>Contact us</h2>
  <p>If you have questions or need to contact the permit staff at the National Forest Service,
   please use a method listed below.</p>
   <h3>Contact</h3>
       <table class="bordered" cellpadding="0" cellspacing="0">
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Name</th>
        <td class="border-bottom">${contactInfo.name}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Title</th>
        <td class="border-bottom">${contactInfo.title}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Phone number</th>
        <td class="border-bottom">${contactInfo.phone}</td>
      </tr>
      <tr>
        <th scope="row" style="width: 150px;" class="border-bottom border-right">Email</th>
        <td class="border-bottom">${contactInfo.email}</td>
      </tr>
    </table>
   <p>Thank you for your interest in our National Forests.</p>
  `
};