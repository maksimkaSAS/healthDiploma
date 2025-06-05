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
				path: 'createpatient',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Createpatient'
					}
				},
				loadChildren: () =>
					import(
						'./pages/guest/createpatient/createpatient.module'
					).then((m) => m.CreatepatientModule)
			},
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
				path: 'links',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Links'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthlink/pages/links/links.module'
					).then((m) => m.LinksModule)
			},

			{
				path: 'onepatienthistory',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Onepatienthistory'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/onepatienthistory/onepatienthistory.module'
					).then((m) => m.OnepatienthistoryModule)
			},
			{
				path: 'oneplacepage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Oneplacepage'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/oneplacepage/oneplacepage.module'
					).then((m) => m.OneplacepageModule)
			},
			{
				path: 'onepharmacypage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Onepharmacypage'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/onepharmacypage/onepharmacypage.module'
					).then((m) => m.OnepharmacypageModule)
			},

			{
				path: 'onepatientpage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Onepatientpage'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/onepatientpage/onepatientpage.module'
					).then((m) => m.OnepatientpageModule)
			},
			{
				path: 'allplaces',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Places'
					}
				},
				loadChildren: () =>
					import('./pages/user/places/places.module').then(
						(m) => m.PlacesModule
					)
			},
			{
				path: 'allcomments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Comments'
					}
				},
				loadChildren: () =>
					import('./pages/user/comments/comments.module').then(
						(m) => m.CommentsModule
					)
			},
			{
				path: 'trade',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Trade'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthtrade/pages/trade/trade.module'
					).then((m) => m.TradeModule)
			},
			{
				path: 'places',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Places'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthplace/pages/places/places.module'
					).then((m) => m.PlacesModule)
			},
			{
				path: 'diseasefinder',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Diseasefinder'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/diseasefinder/diseasefinder.module'
					).then((m) => m.DiseasefinderModule)
			},
			{
				path: 'pharmacy',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Pharmacy'
					}
				},
				loadChildren: () =>
					import('./pages/user/pharmacy/pharmacy.module').then(
						(m) => m.PharmacyModule
					)
			},
			{
				path: 'pharmaciespage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Pharmaciespage'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/pharmaciespage/pharmaciespage.module'
					).then((m) => m.PharmaciespageModule)
			},
			{
				path: 'doctorpage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Doctorpage'
					}
				},
				loadChildren: () =>
					import('./pages/user/doctorpage/doctorpage.module').then(
						(m) => m.DoctorpageModule
					)
			},
			{
				path: 'doctorspage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Doctorspage'
					}
				},
				loadChildren: () =>
					import('./pages/user/doctorspage/doctorspage.module').then(
						(m) => m.DoctorspageModule
					)
			},
			{
				path: 'clinicpage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clinicpage'
					}
				},
				loadChildren: () =>
					import('./pages/user/clinicpage/clinicpage.module').then(
						(m) => m.ClinicpageModule
					)
			},
			{
				path: 'clinicspage',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clinicspage'
					}
				},
				loadChildren: () =>
					import('./pages/user/clinicspage/clinicspage.module').then(
						(m) => m.ClinicspageModule
					)
			},
			{
				path: 'myfirstaidkit',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Myfirstaidkit'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/myfirstaidkit/myfirstaidkit.module'
					).then((m) => m.MyfirstaidkitModule)
			},
			{
				path: 'patienthistory',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Patienthistory'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/patienthistory/patienthistory.module'
					).then((m) => m.PatienthistoryModule)
			},
			{
				path: 'patientprofile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Patientprofile'
					}
				},
				loadChildren: () =>
					import(
						'./pages/user/patientprofile/patientprofile.module'
					).then((m) => m.PatientprofileModule)
			},
			{
				path: 'mypatients',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Patient'
					}
				},
				loadChildren: () =>
					import('./pages/user/patient/patient.module').then(
						(m) => m.PatientsModule
					)
			},
			{
				path: 'pharmacies',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Pharmacies'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthpharmacy/pages/pharmacies/pharmacies.module'
					).then((m) => m.PharmaciesModule)
			},
			{
				path: 'comments',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Comments'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthcomment/pages/comments/comments.module'
					).then((m) => m.CommentsModule)
			},
			{
				path: 'doctors',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Doctors'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthdoctor/pages/doctors/doctors.module'
					).then((m) => m.DoctorsModule)
			},
			{
				path: 'clinics',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Clinics'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthclinic/pages/clinics/clinics.module'
					).then((m) => m.ClinicsModule)
			},
			{
				path: 'analysis',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Analysis'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthanalysis/pages/analysis/analysis.module'
					).then((m) => m.AnalysisModule)
			},
			{
				path: 'symptoms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Symptoms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthsymptom/pages/symptoms/symptoms.module'
					).then((m) => m.SymptomsModule)
			},
			{
				path: 'treatment',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Treatment'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthtreatment/pages/treatment/treatment.module'
					).then((m) => m.TreatmentModule)
			},
			{
				path: 'diseases',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Diseases'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthdisease/pages/diseases/diseases.module'
					).then((m) => m.DiseasesModule)
			},
			{
				path: 'drugs',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Drugs'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthdrug/pages/drugs/drugs.module'
					).then((m) => m.DrugsModule)
			},
			{
				path: 'records',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Records'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthrecord/pages/records/records.module'
					).then((m) => m.RecordsModule)
			},
			{
				path: 'patients',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Patients'
					}
				},
				loadChildren: () =>
					import(
						'./modules/healthpatient/pages/patients/patients.module'
					).then((m) => m.PatientsModule)
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

			// {
			// 	path: 'translates',
			// 	canActivate: [MetaGuard],
			// 	data: {
			// 		meta: {
			// 			title: 'Translates'
			// 		}
			// 	},
			// 	loadChildren: () =>
			// 		import(
			// 			'./core/modules/translate/pages/translates/translates.module'
			// 		).then((m) => m.TranslatesModule)
			// }
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
