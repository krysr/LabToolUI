import {Demo} from "../lab/lab";
import {Time} from "@angular/common";

export class Statistic {
  statId: number;
  demo: Demo;
  waitingTime: number;
  demoStartTime: Date;
  demoEndTime: Date;
  date: Date;
  joinTime: Date;
}
