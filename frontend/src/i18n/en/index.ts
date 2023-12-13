import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	Sidebar: {
		Reviews: 'Reviews',
		Forms: 'Forms',
		Statistics: 'Statistics'
	},
	ReviewButton: "Create review",
	NewReviewTitle: "Create new review",
	PerformanceModule: "Performance module",
	Hello: "Hello",
	FormButton: "Create form",
	FormSearchInput: "Insert the title of the form template to filter the list",
	CreateFormModel: "Create form model",
	CreateFormModelDescription: "This feature allows the creation of form templates, establishing predefined structures for future reviews. Simplify the assessment process by creating consistent patterns, saving time, and maintaining uniformity in evaluations.",
	YourWork: "Your Work",
	CreateBlankReview: "Create blank review",
	CopyFormModel: "Copy form model",
	CreateBlankReviewDescription: "Create an empty review, that allows adding questions, associate the review type, specify the responsable and start and end date.",
	CopyFormModelDescription: "Create a review with a form template that includes predefined questions.",
	ShowSidebar: "Show sidebar",
	HideSidebar: "Hide sidebar",
	Settings: "Settings",
	Preview: "Preview",
	Details: "Details",
	Questions: "Questions",
	Finalize: "Finalize",
	ChooseLanguage: "Choose a language",
	Portuguese: "Portuguese",
	English: "English",
	French: "French",
	Spanish: "Spanish",
	Polish: "Polish",
	QuestionType: {
		Text: "Text",
		SingleChoice: "SingleChoice",
		Rating: "Rating",
	},
	Title: "Title",
	Description: "Description",
	ReviewSearchInput: "Insert the title of the review to filter the list",
	Ongoing: "Ongoing",
	Completed: "Completed",
	NotStarted: "Not started",
	Canceled: "Canceled",
	State: "State",
	EndingDate: "Ending date",
	Progression: "Progression",
	FormModelTitleTitle: "Form model title",
	FormModelTitleDescription: "Insert a title for the form model.",
	FormModelDescriptionTitle: "Form model description",
	FormModelDescriptionDescription: "Add a brief description that highlights the purpose or content of the model. This will help provide additional guidance on the form when selecting it for review.",
	Return: "Return",
	Forward: "Forward",
	QuestionTypeText: "Type of Question",
	FormPreview: "Form Preview",
	QuestionProperties: "Question Properties",
	FormPreviewPlaceholder: "No questions yet, drag one type of question to add a question to this form.",
	FormPreviewRatingPlaceholder: "No rating option answers yet.",
	FormPreviewSingleChoicePlaceholder: "No single choice option answers yet.",
	Answer: "Answer",
	Required: "Required",
	Answers: "Answers",
	Numeric: "Value",
	AddOption: "Add an option",
	AddSingleChoiceOptionError: "Single Choice option must have a text",
	AddRatingOptionError01: "All fields must be filled",
	AddRatingOptionError02: "A rating option for this number already exists",
	FormTemplateSuccess: "Form Template created successfully",
	QuestionWithoutDesc: "Question without description",
	ErrorsFormTemplate: {
		Title: "Form template must have a title",
		Question: "Form template must have at least one question",
		Others: "Server error"
	},
	Departments: "Departments",
	ReviewTitleTitle: "Review Title",
	ReviewTitleDescription: "Insert a title to identify the review. Exemplo: 'Revisão Trimestral de Desempenho'",
	ReviewDescriptionTitle: "Review Description",
	ReviewDescriptionDescription: "Provide a detailed explanation of the scope, criteria, and objectives of this review. This helps ensure a comprehensive understanding of the elements to be evaluated.",
	ReviewTypeTitle: "Review type",
	ReviewTypeDescription: "Choose the evaluation method that best suits the organizational dynamics.",
	SaveReviewAsForm: "Save Review as Form template",
	SaveReviewAsFormDesc: "If you wish, you can save the questionnaire from this review as a form template to facilitate the quick creation of future reviews. Just check the option below.",
	Save: "Save Form",
	StartAndEndDateText: "Specify Start and End Date.",
	StartAndEndDateDesc: "Optionally, you can specify start and end dates for the review. If you don't provide this information now, you will be prompted to indicate the dates when you actually start the review.",
	TopDown: {
		Label: "Top-Down",
		Text: "Evaluation conducted from the top down, typically by supervisors."
	},
	BottomUp: {
		Label: "Bottom-Up",
		Text: "Evaluation conducted from the bottom up, where employees also assess their superiors."
	},
	SelfEvaluation: {
		Label: "Self-Evaluation",
		Text: "Individual self-evaluation of performance."
	},
	Interdepartmental: {
		Label: "Interdepartmental",
		Text: "Evaluation among superiors from different departments."
	},
	StartDate: "Start Date",
	EndDate: "End Date",
	SelectDepartmentsLabel: "Select Departments to be Evaluated",
	SelectDepartmentsText: "Select the department(s) that will be evaluated during this review. This helps to focus the assessment on specific areas of the organization."
}

export default en