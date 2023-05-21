import * as yup from 'yup'
import { CHTG, HDSD, TLNV } from './utility'

export const initialValues = {
  applyFor: '',
  question: '',
  resultText: '',
  categoryQuestionId: '',
  categoryQuestionType: 'CHTG',
  sendTo: null,
  rsLinkPDF: '',
  rsLinkYT: '',
  public: false,
  deleted: false
}
export const validateSchema = yup.object().shape(
  {
    applyFor : yup.string().when('public' , {
      is : true ,
      then : yup.string().nullable().required('Không được để trống')
    }),
    question: yup.string().nullable().required('Không được để trống'),
    resultText: yup.string().nullable().when('categoryQuestionType', {
      is: CHTG,
      then: yup.string().required('Không được để trống')
    }),
    categoryQuestionId: yup.string().nullable().required('Không được để trống'),
    sendTo: yup.string().nullable().when('public', {
      is: false,
      then: yup.string().nullable().required('Không được để trống')
    }),
    rsLinkYT: yup.string().nullable().when('categoryQuestionType' , {
      is : HDSD , 
      then : yup.string().when('rsLinkPDF', {
        is: (link) => !link || link.length === 0,
        then: yup.string().required(),
        otherwise: yup.string()
      })
    }).when('categoryQuestionType' , {
      is : TLNV , 
      then : yup.string().when('rsLinkPDF', {
        is: (link) => !link || link.length === 0,
        then: yup.string().required(),
        otherwise: yup.string()
      })
    }),
    rsLinkPDF: yup.string().nullable().when('categoryQuestionType' ,{ 
      is:HDSD, 
      then : yup.string().when('rsLinkYT', {
        is: (link) => !link || link.length === 0,
        then: yup.string().required(),
        otherwise: yup.string()
      })
    }).when('categoryQuestionType' ,{ 
      is:HDSD, 
      then : yup.string().when('rsLinkYT', {
        is: (link) => !link || link.length === 0,
        then: yup.string().required(),
        otherwise: yup.string()
      })
    })
  },
  [['rsLinkYT', 'rsLinkPDF']]
)
