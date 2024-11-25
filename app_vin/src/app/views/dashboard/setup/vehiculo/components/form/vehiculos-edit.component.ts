import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {abcForms} from '../../../../../../../environments/generals';
import {Vehiculo} from '../../models/vehiculo';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialogRef} from "@angular/material/dialog";
import {JsonPipe} from "@angular/common";

@Component({
    selector: 'app-vehiculo-edit',
    standalone: true,
    imports: [FormsModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSlideToggleModule, MatFormFieldModule, MatInputModule, JsonPipe],
    template: `
        <div class="flex flex-col max-w-240 md:min-w-160 max-h-screen -m-6">
            <!-- Header -->
            <div
                class="flex flex-0 items-center justify-between h-16 pr-3 sm:pr-5 pl-6 sm:pl-8 bg-primary text-on-primary">
                <div class="text-lg font-medium" [innerHTML]="title"></div>
                <button mat-icon-button (click)="cancelForm()" [tabIndex]="-1">
                    <mat-icon
                        class="text-current"
                        [svgIcon]="'heroicons_outline:x-mark'"
                    ></mat-icon>
                </button>
            </div>
            <form class="flex flex-col flex-auto p-6 sm:p-8 overflow-y-auto" [formGroup]="vehiculoForm">
                <mat-form-field>
                    <mat-label>marca</mat-label>
                    <input matInput formControlName="marca"/>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>modelo</mat-label>
                    <input matInput formControlName="modelo"/>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>placa</mat-label>
                    <input matInput formControlName="placa"/>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>color</mat-label>
                    <input matInput formControlName="color"/>
                </mat-form-field>
                <mat-form-field>
                    <mat-label>tipo</mat-label>
                    <input matInput formControlName="tipo"/>
                </mat-form-field>

                <div class="flex flex-col sm:flex-row sm:items-center justify-between mt-4 sm:mt-6">
                    <div class="flex space-x-2 items-center mt-4 sm:mt-0 ml-auto">
                        <button mat-stroked-button [color]="'warn'" (click)="cancelForm()">Cancelar</button>
                        <button mat-stroked-button [color]="'primary'" (click)="saveForm()">
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    `
})
export class VehiculoEditComponent implements OnInit {
    vehiculoForm = new FormGroup({
        marca: new FormControl('', [Validators.required]),
        modelo: new FormControl('', [Validators.required]),
        placa: new FormControl('', [Validators.required]),
        color: new FormControl('', [Validators.required]),
        tipo: new FormControl('', [Validators.required]),

    });

    @Input() title: string = '';
    @Input() vehiculo = new Vehiculo();
    abcForms: any;

    constructor(
        private formBuilder: FormBuilder,
        private _matDialog: MatDialogRef<VehiculoEditComponent>,
    ) {
    }

    ngOnInit() {
        this.abcForms = abcForms;

        if (this.vehiculo) {
            console.log(this.vehiculo);
            this.vehiculoForm.patchValue(this.vehiculo);
        }
    }

    public saveForm(): void {
        if (this.vehiculoForm.valid) {
            this._matDialog.close(this.vehiculoForm.value);
        }
    }

    public cancelForm(): void {
        this._matDialog.close('');
    }
}