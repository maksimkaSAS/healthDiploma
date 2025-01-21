import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'pharmacies',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Pharmacies'
					}
				},
				loadChildren: () => import('./modules/healthpharmacy/pages/pharmacies/pharmacies.module').then(m => m.PharmaciesModule)
			}, 
			{
				path: 'comments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Comments'
					}
				},
				loadChildren: () => import('./modules/healthcomment/pages/comments/comments.module').then(m => m.CommentsModule)
			}, 
			{
				path: 'doctors',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Doctors'
					}
				},
				loadChildren: () => import('./modules/healthdoctor/pages/doctors/doctors.module').then(m => m.DoctorsModule)
			}, 
			{
				path: 'clinics',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clinics'
					}
				},
				loadChildren: () => import('./modules/healthclinic/pages/clinics/clinics.module').then(m => m.ClinicsModule)
			}, 
			{
				path: 'analysis',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Analysis'
					}
				},
				loadChildren: () => import('./modules/healthanalysis/pages/analysis/analysis.module').then(m => m.AnalysisModule)
			}, 
			{
				path: 'symptoms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Symptoms'
					}
				},
				loadChildren: () => import('./modules/healthsymptom/pages/symptoms/symptoms.module').then(m => m.SymptomsModule)
			}, 
			{
				path: 'treatment',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Treatment'
					}
				},
				loadChildren: () => import('./modules/healthtreatment/pages/treatment/treatment.module').then(m => m.TreatmentModule)
			}, 
			{
				path: 'diseases',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Diseases'
					}
				},
				loadChildren: () => import('./modules/healthdisease/pages/diseases/diseases.module').then(m => m.DiseasesModule)
			}, 
			{
				path: 'drugs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Drugs'
					}
				},
				loadChildren: () => import('./modules/healthdrug/pages/drugs/drugs.module').then(m => m.DrugsModule)
			}, 
			{
				path: 'records',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Records'
					}
				},
				loadChildren: () => import('./modules/healthrecord/pages/records/records.module').then(m => m.RecordsModule)
			}, 
			{
				path: 'patients',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Patients'
					}
				},
				loadChildren: () => import('./modules/healthpatient/pages/patients/patients.module').then(m => m.PatientsModule)
			}, 
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		CoreModule,
		BrowserModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: environment.meta.title,
					description: environment.meta.description,
					titleSuffix: ' | ' + environment.meta.title,
					'og:image': environment.meta.icon
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			},
			alert: {
				alerts: {
					/* alerts */
				}
			},
			loader: {
				loaders: {
					/* loaders */
				}
			},
			popup: {
				popups: {
					/* popups */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		/* providers */
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
