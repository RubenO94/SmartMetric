type Question = {
    isRequired: boolean
    position: number,
    responseType: string | undefined,
    translations: Translations[],
    singleChoiceOptions: SingleChoiceOption[],
    ratingOptions: RatingOption[]
}

type SingleChoiceOption = {
    translations: Translations[]
}

type RatingOption = {
    numericValue: number | null,
    translations: Translations[]
}

type FormTemplate  = {
    createdDate: any | null,
    formTemplateId: string | null,
    createdByUserId: number,
    modifiedDate: string | null
    translations: Translations[],
    questions: Question[]
}

type Translations = {
    language: string,
    title: string,
    description: string,
}

type Reviews = {
    createdByUserId: number,
    startDate: string | null,
    endDate: Date | null,
    reviewType: string,
    reviewStatus: string,
    translations: Translations[],
    questions: Question[],
    reviewDepartmentsIds: Array<number>,
    reviewEmployeesIds: Array<number>
}

type Secrets = {
    apiUrl: string
}

type Departments = {
    departmentId: number,
    departmentDescription: string,
    departmentParentId: number,
    checked: boolean
}

type Search = {
    object: FormTemplate,
    searchTerms: string
}

type User = {
    userId: number,
    userName: string,
    profileDescription: string,
    profileType: string
    authorizations: any[]
}