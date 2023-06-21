export const templates = {
 folders:["freelancer","lead","reseller"],
 template:{
  delete:["verify-email.html","welcome.html","desactive-account.html","invoice.html","lead.html","payment.html","promotional.html","reset-password.html"],
  freelancer:["mail-invoice.html","mail-promo-2.html","mail-welcome.html"],
  lead:["promo-web.html","promo-rrss.html","promo-shop.html","promo-seo.html","promo-crm.html","promo-office.html","promo.html","reminder.html","collab.html"],
  reseller:["mail-win-win.html","yy.html","mail-promo-4.html","mail-reset-password.html","mail-verify-email.html","mail-welcome.html","mail-deactivate-account.html","mail-invoice.html","mail-promo-1.html","mail-promo-2.html","mail-promo-3.html"]
 }
}
//["mail-welcome.html","mail-verify-email.html","mail-deactivate-account.html","mail-invoice.html","mail-promo-1.html","mail-promo-2.html","mail-reset-password.html"] old lead templates

export const templatesAvailables = {
  folders:["freelancer","lead","reseller"],
  template:{
    delete:["verify-email.html","welcome.html","desactive-account.html","invoice.html","lead.html","payment.html","promotional.html","reset-password.html"],
    freelancer:["mail-invoice.html","mail-promo-2.html","mail-welcome.html"],
    lead:[{f:"promo",t:"Subvención",d:'promo'},{f:"reminder",t:"Recordatorio",d:"reminder"},{f:"promo-web",t:"Aythen WEB",d:'WEB'},{f:"promo-shop",t:"Aythen SHOP",d:'Shop'},{f:"promo-seo",t:"Aythen Seo",d:'SEO'},{f:"promo-rrss",t:"Aythen RRSS",d:'RedesSociales'},{f:"promo-office",t:"Aythen Office",d:'Office'},{f:"promo-crm",t:"Aythen CRM",d:'crm'},],
    reseller:["mail-win-win.html","yy.html","mail-promo-4.html","mail-reset-password.html","mail-verify-email.html","mail-welcome.html","mail-deactivate-account.html","mail-invoice.html","mail-promo-1.html","mail-promo-2.html","mail-promo-3.html"]
  }
}

/*

Recordatorio
-
Promo: Aythen WEB
-
Promo: Aythen SHOP
-
Promo: Aythen SEO
-
Promo: Aythen RRSS
-
Promo: Aythen OFFICE


*/