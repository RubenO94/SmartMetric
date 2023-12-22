export function handleValidationsForm(formTemplate: FormTemplate, currentStep: number): [boolean, any] {
    //Create variable
    let [formValid, error]: [boolean, string] = [true, '']

    if (currentStep == 0) {
        //Check formTemplate titles for each language
        formTemplate.translations.forEach(element => {
            if (element.title == '' || element.title == null) {
                [formValid, error] = [false, 'title']
                return
            }
        });
    } else if (currentStep == 1) {
        //Check if form has at least one question
        if (currentStep == 1 && formTemplate.questions.length == 0) [formValid, error] = [false, "question"]

        //Check if form template questions have title for each language
        formTemplate.questions.forEach((question) => {
            question.translations.forEach((translation) => {
                if (translation.title == '' || translation.title == null) {
                    [formValid, error] = [false, 'questionTitle']
                    return
                }
            })
        })
    }

    return [formValid, error]
}

export function handlevalidationsReview(review: Reviews, currentStep: number): [boolean, any] {
    return [true, "Passing"]
}