export interface IGtmEvent {
  event: string
  page_location?: string
  formId?: string
  formName?: string
  formType?: string
  fieldCount?: number
  buttonType?: string
  [key: string]: unknown
}

export const pushToDataLayer = (eventData: IGtmEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData)
  }
}

export const formSubmissionEvent = (
  formType: string,
  formId: string | undefined,
  values: object,
) => {
  pushToDataLayer({
    event: 'formSubmission',
    formType,
    formId,
    values,
  })
}

export const WAClickEvent = (pageLocation: string) => {
  pushToDataLayer({
    event: 'WAClick',
    page_location: pageLocation,
  })
}

export const phoneClickEvent = (pageLocation: string) => {
  pushToDataLayer({
    event: 'phoneClick',
    page_location: pageLocation,
  })
}

export const emailClickEvent = (pageLocation: string) => {
  pushToDataLayer({
    event: 'emailClick',
    page_location: pageLocation,
  })
}
