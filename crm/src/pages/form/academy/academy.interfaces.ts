export interface FirstEvent {
  answer1: string | null;
  answer2: string | null;
  answer3: string | null;
}

export interface SecondEvent {
  answer1: string | null;
  answer2: string | null;
  answer3: string | null;
  answer4: string | null;
}

export interface ThirdEvent {
  answer1: string | null;
  answer2: string | null;
  answer3: string | null;
  answer4: string | null;
}

export interface FourthEvent {
  answer1: string | null;
  answer2: string | null;
}

export interface Abilities {
  aythen: boolean | false;
  crm: boolean | false;
  reseller: boolean | false;
  services: boolean | false;
}

export interface AcademyQuestions {
  firstEvent: FirstEvent;
  secondEvent: SecondEvent;
  thirdEvent: ThirdEvent;
  fourthEvent: FourthEvent;
}