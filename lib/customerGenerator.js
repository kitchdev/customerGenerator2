const faker = require('faker')

faker.locale = "en_CA";

// fields to consider ===>
// First Name,Last Name,Email,Company,Address1,Address2,City,Province,Province Code,
// Country,Country Code,Zip,Phone,Accepts Marketing,Total Spent,Total Orders,Tags,Note,Tax Exempt

module.exports = async (realAddresses) => {
  let customers = []
  for (let i = 0; i < realAddresses.length; i++) {
    const first_name = await faker.fake('{{name.firstName}}')
    const last_name = await faker.fake('{{name.lastName}}')
    const phone = await faker.phone.phoneNumberFormat(3)
    const email = await faker.fake('{{internet.email}}')
    const random_boolean = Math.random() >= 0.5
    const randomNum = Math.floor(Math.random() * 100) + 1  
    const companyName = await faker.fake('{{company.companyName}}')
    const randomAmount$ = await faker.fake('{{finance.amount}}')

    const customer = {
        'First Name': first_name,
        'Last Name': last_name,
        Email: email,
        Company: companyName,
        Address1: realAddresses[i].Address1,
        Address2: realAddresses[i].Address2,
        City: realAddresses[i].City,
        Province: realAddresses[i].Province,
        'Province Code': realAddresses[i]['Province Code'],
        Country: realAddresses[i].Country,
        'Country Code': realAddresses[i]['Country Code'],
        Zip: realAddresses[i].Zip,
        Phone: phone,
        'Accepts Marketing': random_boolean,
        'Total Spent': randomAmount$,
        'Total Orders': randomNum,
        Tags: realAddresses[i].Tags,
        Note: realAddresses[i].Note,
        'Tax Exempt': random_boolean
    }
    customers.push(customer)
  }
  return customers
}
