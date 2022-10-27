import { format, formatDistanceToNow } from 'date-fns';


export const fDate = (date) => {
  return format(new Date(date), 'dd MMMM yyyy');
}

export const fDateTime = (date) => {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export const fDateTimeSuffix = (date) => {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export const fToNow = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}
