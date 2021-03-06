import moment from 'moment';

export function getDay(time: string) {
  const timeTransfer = '00' + moment(time, ['YYYY-MM-DD']).date();
  return timeTransfer.toString().substr(timeTransfer.length - 2, 2);
}

export function timeParser(time: string) {
  return moment(time, ['YYYY-MM-DD'])
    .format('MM月DD日 星期(e)')
    .replace(
      /\(\d\)/,
      (d: string) =>
        ['日', '一', '二', '三', '四', '五', '六'][
          parseInt(d.replace(/[()]/g, ''), 10)
        ],
    );
}
export function timeMMDD(time: string) {
  return moment(time, ['YYYY-MM-DD']).format('MM月DD日');
}
