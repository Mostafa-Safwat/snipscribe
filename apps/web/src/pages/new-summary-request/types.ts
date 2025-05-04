import { FormProps } from '@/components/form/types';
import { summaryService } from '@/services/summary.service';
import * as yup from 'yup';

export const summaryRequestCreateFields: FormProps = {
    initialValues: {
        url: '',
        language: 'English',
    },
    validation: yup.object().shape({
        url: yup.string().url().required('URL is required'),
        language: yup
            .string()
            .oneOf(['English', 'Arabic'], 'Language must be either English or Arabic')
            .required('Language is required'),
    }),
    onSubmit: async values => {
        const { createSummaryRequest } = summaryService();
        const { url, language } = values;

        await createSummaryRequest({
            createSummaryRequestDto: {
                url,
                language,
            },
        });
    },
    fields: [
        {
            name: 'url',
            label: 'URL',
            type: 'text',
        },
        {
            name: 'language',
            label: 'Language',
            type: 'select',
            options: [
                { value: 'English', label: 'English' },
                { value: 'Arabic', label: 'Arabic' },
            ],
        },
    ],
};
