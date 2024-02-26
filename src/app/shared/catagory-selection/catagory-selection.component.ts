import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/core/data-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catagory-selection',
  templateUrl: './catagory-selection.component.html',
  styleUrls: ['./catagory-selection.component.css']
})
export class CatagorySelectionComponent implements OnInit, OnDestroy {

  public totalDocs = 0;

  public gapCount = 0;
  public helpCount = 0;
  public workflowCount = 0;
  public validationCount = 0
  public planCount = 0;
  public bugCount = 0;
  public mitigationCount = 0;
  public monitoringCount = 0;
  public exceptionCount = 0;
  public escalationCount = 0;
  public useCaseCount = 0;
  public fixCount = 0;
  public questionCount = 0;

  private _data1Subscription?: Subscription;

  constructor(private _dataService: DataService) { 
    // this._dataService.getAll('project-documents')
  }

  ngOnInit(): void {
    this._data1Subscription = this._dataService.items?.subscribe((data) => {
      this.countDocsByCategory(data);
    })

  }

  ngOnDestroy(): void {
    if (this._data1Subscription) 
      this._data1Subscription.unsubscribe();
  }

  public countDocsByCategory(data: any) {
    this.totalDocs = (data && data.length) ? data.length : 0;

    this.gapCount = this.getGapCount(data);
    this.helpCount = this.getHelpCount(data);
    this.workflowCount = this.getWorkflowCount(data);
    this.validationCount = this.getValidationCount(data);
    this.planCount = this.getPlanCount(data);
    this.bugCount = this.getBugCount(data);
    this.mitigationCount = this.getMitigationCount(data);
    this.monitoringCount = this.getMonitoringCount(data);
    this.exceptionCount = this.getExceptionCount(data);
    this.escalationCount = this.getEscalationCount(data);
    this.useCaseCount = this.getUseCaseCount(data);
    this.fixCount = this.getFixCount(data);
    this.questionCount = this.getQuestionCount(data);

  }

  private getGapCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'gap') )
    }).length;
  }

  private getHelpCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'help') )
    }).length;
  }

  private getWorkflowCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'workflow') )
    }).length;
  }

  private getValidationCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'validation') )
    }).length;
  }

  private getPlanCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'plan') )
    }).length;
  }

  private getBugCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'bug') )
    }).length;
  }

  private getMitigationCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'mitigation') )
    }).length;
  }

  private getMonitoringCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'monitoring') )
    }).length;
  }

  private getExceptionCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'exception') )
    }).length;
  }

  private getEscalationCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'escalation') )
    }).length;
  }

  private getUseCaseCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'use case') )
    }).length;
  }

  private getFixCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'fix') )
    }).length;
  }
  private getQuestionCount(data: any) : number {
    return data.filter((data: any) => {
      return (data && data.category && (data.category.toLowerCase() == 'question') )
    }).length;
  }

}
