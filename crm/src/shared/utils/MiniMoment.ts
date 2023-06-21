export default class MiniMoment {
    
  static setDigits(value: number | string, { digits = 2 } = {}) {
    return String(value).padStart(digits, "0");
  }
  
  static formatDateWithHour(date: string): string {
    const normalize = new Date(date);
    const year = this.setDigits(normalize.getFullYear());
    const month = this.setDigits(normalize.getMonth() + 1);
    const day = this.setDigits(normalize.getDate());
    const fullYear = `${day}/${month}/${year}`;
    const hour = this.setDigits(normalize.getHours());
    const minutes = this.setDigits(normalize.getMinutes());
    const fullHour = `${hour}:${minutes}`
    return `${fullYear} ${fullHour}`;
  }
  
  static formatDateWithoutHour(date: string): string {
    const normalize = new Date(date);
    const year = this.setDigits(normalize.getFullYear());
    const month = this.setDigits(normalize.getMonth() + 1);
    const day = this.setDigits(normalize.getDate());
    const fullYear = `${day}/${month}/${year}`;
    return fullYear;
  }
  
  static get nowDateForHTML() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    const formatted = formatter.format(now);
    return formatted.split('/').reverse().join('-')
  }
  
  static createFormatToCalendar(date) {
    const now = new Date(date);
    const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().slice(0, 5);
    return formattedDate;
  }
  
  static addAnHour(date) {
    const now = new Date(date);
    now.setHours(now.getHours() + 1); 
    const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().slice(0, 5);
    return formattedDate;
  }
  
}