import type { Translation } from '../i18n-types'

const pt: Translation = {
	Sidebar: {
		Reviews: 'Revisões',
		Forms: 'Formulários',
		Statistics: 'Estatísticas'
	},
	ReviewButton: 'Criar revisão',
	NewReviewTitle: 'Criar nova revisão',
	PerformanceModule: 'Módulo de desempenho',
	Hello: 'Olá',
	FormButton: 'Criar formulário',
	FormSearchInput: 'Insira o titulo do modelo de formulário para filtrar a lista',
	CreateFormModel: 'Criar modelo de formulário',
	CreateFormModelDescription: 'Este recurso permite a criação de modelos de formulário, estabelecer estruturas pré-definidas para futuras revisões. Simplifique o processo de avaliação criando padrões consistentes, poupando tempo e mantendo uniformidade nas avaliações.',
	YourWork: 'Área de trabalho',
	CreateBlankReview: 'Criar revisão vazia',
	CopyFormModel: 'Copiar modelo de formulário',
	CreateBlankReviewDescription: 'Cria uma revisão vazia, permite a adição de questões, associação do tipo de revisão, especificação do responsável, data de início e término.',
	CopyFormModelDescription: 'Cria uma revisão preenchida com um modelo de formulário que inclui questões pré-definidas.',
	ShowSidebar: 'Mostrar barra lateral',
	HideSidebar: 'Esconder barra lateral',
	Settings: 'Definições',
	Preview: 'Pré-Visualizar',
	Details: 'Detalhes',
	Questions: 'Questões',
	Finalize: 'Finalizar',
	ChooseLanguage: 'Escolha um idioma',
	Portuguese: 'Português',
	English: 'Inglês',
	French: 'Francês',
	Spanish: 'Espanhol',
	Polish: 'Polaco',
	QuestionType: {
		Text: 'Texto',
		SingleChoice: 'Escolha Única',
		Rating: 'Numérico'
	},
	Title: 'Título',
	Description: 'Descrição',
	ReviewSearchInput: 'Insira o titulo da revisão para filtrar a lista',
	Ongoing: 'Em curso',
	Completed: 'Completas',
	NotStarted: 'Por iniciar',
	Canceled: 'Canceladas',
	State: 'Estado',
	EndingDate: 'Data de Encerramento',
	Progression: 'Progressão',
	FormModelTitleTitle: 'Titulo do modelo de formulário',
	FormModelTitleDescription: 'Inserir um título para o modelo de formulário.',
	FormModelDescriptionTitle: 'Descrição do modelo de formulário',
	FormModelDescriptionDescription: 'Adicione uma breve descrição que destaque o propósito ou conteúdo do modelo. Isso ajudará a fornecer orientações adicionais sobre o formulário ao selecioná-lo para revisão.',
	Return: 'Voltar',
	Forward: 'Avançar',
	QuestionTypeText: 'Tipo de Questão',
	FormPreview: 'Pré-visualização da Questão',
	QuestionProperties: 'Propriedades da Questão',
	FormPreviewPlaceholder: 'Nenhuma pergunta ainda, mova um tipo de pergunta para adicionar uma pergunta ao formulário.',
	FormPreviewRatingPlaceholder: 'Nenhuma resposta de classificação.',
	FormPreviewSingleChoicePlaceholder: 'Nenhuma resposta de escolha única.',
	Answer: 'Resposta',
	Required: 'Obrigatório',
	Answers: 'Respostas',
	Numeric: 'Valor',
	AddOption: 'Adicionar uma opção',
	AddSingleChoiceOptionError: 'Opção de escolha única deve ter um texto',
	AddRatingOptionError01: 'Todos os campos devem ser preenchidos',
	AddRatingOptionError02: 'Uma opção de resposta numérica já tem este valor numérico',
	FormTemplateSuccess: 'Modelo de formulário criado com sucesso',
	QuestionWithoutDesc: 'Questão sem descrição',
	ErrorsFormTemplate: {
		Title: 'Modelo de formulário deve ter um título',
		Question: 'Modelo de formulário deve ter pelo menos uma questão',
		QuestionTitle: 'Todas as questões do formulário deve ter titulo',
		Others: 'Erro do servidor',
		SomethingWrong: ''
	},
	Departments: 'Departamentos',
	ReviewTitleTitle: 'Título da Revisão',
	ReviewTitleDescription: 'Insira um título para identificar a revisão. Exemplo: "Revisão Trimestral de Desempenho"',
	ReviewDescriptionTitle: 'Descrição da Revisão',
	ReviewDescriptionDescription: 'Forneça uma explicação detalhada do escopo, critérios e objetivos desta revisão. Isso ajuda a garantir uma compreensão abrangente dos elementos a serem avaliados.',
	ReviewTypeTitle: 'Tipo de Revisão',
	ReviewTypeDescription: 'Escolha o método de avaliação que melhor se adequa à dinâmica organizacional.',
	SaveReviewAsForm: 'Guardar Revisão como formulário',
	SaveReviewAsFormDesc: 'Se desejar, pode guardar o questionário desta revisão como um modelo de formulário para facilitar a criação rápida de revisões futuras. Basta marcar a opção abaixo. Se não fizer alterações nas questões não necessita de assinalar a opção.',
	Save: 'Guardar Formulário',
	StartAndEndDateText: 'Indicar Data de Fim',
	StartAndEndDateDesc: 'Opcionalmente, pode especificar datas de início e fim para a revisão. Caso não forneça essas informações agora, será solicitado a indicar as datas quando iniciar efetivamente a revisão.',
	TopDown: {
		Label: 'Top-Down',
		Text: 'Avaliação realizada de cima para baixo, geralmente por supervisores.'
	},
	BottomUp: {
		Label: 'Bottom-Up',
		Text: 'Avaliação realizada de baixo para cima, onde os funcionários também avaliam os seus superiores.'
	},
	SelfEvaluation: {
		Label: 'Auto-Avaliação',
		Text: 'Autoavaliação individual do desempenho.'
	},
	Interdepartmental: {
		Label: 'Interdepartamental',
		Text: 'Avaliação entre superiores de diferentes departamentos.'
	},
	StartDate: 'Data de início',
	EndDate: 'Data de fim',
	SelectDepartmentsLabel: 'Selecionar Departamentos a Serem Avaliados',
	SelectDepartmentsText: 'Selecione o(s) departamento(s) que serão avaliados durante esta revisão. Isso ajuda a direcionar a avaliação para áreas específicas da organização.',
	ErrorsReview: {
		Title: 'Modelo de formulário deve ter um título',
		Question: 'Modelo de formulário deve ter pelo menos uma questão',
		ReviewType: 'Modelo de formulário deve ter um tipo associado',
		Departments: 'Modelo de formulário deve ter pelo menos um departamento associado',
		Others: 'Erro do servidor'
	},
	Backoffice: 'Módulo de Backoffice',
	Frontoffice: 'Módulo de Frontoffice',
	Form: 'Formulário',
	EditFormButton: 'Editar formulário',
	EditFormModel: 'Editar modelo de formulário',
	EditFormModelDescription: 'Esta funcionalidade permite aos utilizadores editar facilmente modelos de formulários, oferecendo uma abordagem simplificada para aperfeiçoar estruturas predefinidas para futuras avaliações. Melhore a eficiência do processo de avaliação ao modificar e atualizar padrões estabelecidos, garantindo economia de tempo e mantendo uniformidade nas avaliações. Seja ajustando critérios, atualizando campos ou refinando conteúdo, a funcionalidade de edição otimiza a personalização de modelos de formulários para atender às necessidades em constante evolução.',
	StateDontExist: 'Revisão deve ser iniciada',
	ButtonExitModule: 'Voltar para o smartTime',
	Delete: 'Remover',
	Cancel: 'Cancelar',
	DeleteDialogForm: 'Remover modelo de formulário?',
	DeleteDialogFormDesc: 'Tem a certeza que pretende remover formulário? Esta ação não pode ser revertida.',
	ChangeReviewStatus: 'Mudar estado da revisão',
	ChangeReviewStatusDesc: 'Tem a certeza que pretende mudar o estado da revisão? Esta ação não pode ser revertida.',
	ChangeStatus: 'Mudar estado',
	ReviewState: {
		NotStarted: 'Não iniciada',
		Active: 'Ativa',
		Canceled: 'Cancelada',
		Completed: 'Completada'
	},
	Help: 'Ajuda',
	StartReview: 'Iniciar revisão',
	ChangeReviewStatusDialog: 'Iniciar revisão?',
	ChangeReviewStatusDialogDesc: 'Tem a certeza que pretende iniciar a revisão? Esta ação não pode ser revertida.',
	Start: 'Iniciar',
	AddEndDate: 'Insira uma data válida como prazo de fim da revisão:',
	User: 'Utilizador',
	ShowFormIn: 'Mostrar formulário em',
	ErrorAddingLanguagesToForm: 'Selecione pelo menos um idioma para o formulário',
	AddLanguage: 'Adicionar idioma',
	Edit: 'Editar',
	CancelReview: 'Cancelar revisão',
	GoBack: 'Voltar',
	ChangeReviewStatusDialog2: 'Cancelar revisão?',
	ChangeReviewStatusDialogDesc2: 'Tem a certeza que pretence cancelar a revisão? Esta ação não pode ser revertida.',
	SaveReviewAsFormDialog: 'Guardar revisão como formulário?',
	SaveReviewAsFormDescDialog: 'Tem a certeza que pretende guardar revisão como formulário.',
	ShowMenu: 'Mostrar menu',
	SaveAsForm: 'Guardar como formulário'
}

export default pt