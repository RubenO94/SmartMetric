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