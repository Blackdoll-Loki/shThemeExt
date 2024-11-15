export interface SelectOptionCreatorProps{
  min: number;
  max: number;
  step?: number;
  str?: string;
}

export function optionCreator(min: number, max: number, step: number = 1, str: string = ''){
  let options = [];
  for(min; min <= max; min += step){
    options.push({label: `${min} ${str}`, value: `${min}`})
  }
  return options;
}

