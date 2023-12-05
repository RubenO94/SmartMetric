type Question = {
    text: string,
    description: string,
    type: string, 
    position: number, 
    required: Boolean,
    singleChoiceOption: SingleChoiceOption[],
    ratingOption: RatingOption[]
}

type SingleChoiceOption = {
    title: string,
    description: string
}

type RatingOption = {
    numericValue: number,
    title: string,
    description: string
}