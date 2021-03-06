import { Demo } from "../lab/lab";

export class Statistic {
  statId: number;
  demo: Demo;
  waitingTime: number;
  demoStartTime: Date;
  demoEndTime: Date;
  date: Date;
  joinTime: Date;
}

export class StatCollection {
  demo: Demo;
  joinTime: string;
  waitingTime: string
  demoTime: string
  date: Date;
}
