type Question = {
    isRequired: boolean
    position: number,
    responseType: string,
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
    createdByUserId: number,
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
    startDate: string,
    endDate: string,
    reviewType: string,
    reviewStatus: string,
    translations: Translations[],
    questions: Question[]
    reviewDepartmentsIds: Array<number>
}

type Secrets = {
    apiUrl: string,
    token: string
}