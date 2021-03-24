module.exports = {
  siteTitle: '$148 Antrag', // <title>
  manifestName: 'Fiskaly',
  manifestShortName: 'Landing', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: '#663399',
  manifestThemeColor: '#663399',
  manifestDisplay: 'standalone',
  manifestIcon: 'src/assets/img/website-icon.png',
  pathPrefix: `/antrag-148AO-wizard-tool/`, // This path is subpath of your hosting https://domain/portfolio
  heading: 'Standardantrag für Formular nach $148 AO',
  subHeading: '',
  // social
  socialLinks: [
    {
      icon: 'fa-envelope-o',
      name: 'Email',
      url: 'mailto:support@fiskaly.com',
    },
  ],
  phone: '000-00000',
  address: 'Fiskaly Adresse HQ, 1150 Wien',
  mailReceiverOfForm148: 'finanzamt@zuständigesFinanzamt.de', 
  mailSubject: 'Antrag auf Fristverlängerung laut $148 AO', 
  mailAnrede: 'Sehr geehrte Damen und Herren', 
  mailAnlage: 'Allgemeine Stellungnahme Verzögerung Zertifizierung\nStatement Kassenhersteller und Integrator\n6er Schreiben'
};
