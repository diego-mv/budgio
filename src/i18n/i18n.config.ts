import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from './locales/en.json'
import esTranslation from './locales/es.json'

i18n.use(initReactI18next).init({
	resources: {
		es: {
			translation: esTranslation
		},
		en: {
			translation: enTranslation
		}
	},
	lng: 'es',
	fallbackLng: 'es',

	interpolation: {
		escapeValue: false
	}
})

export default i18n
