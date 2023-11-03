using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AvaliacaoFormTemplate
{
    public int FormTemplateId { get; set; }

    public string Title { get; set; } = null!;

    public DateTime CreationDate { get; set; }

    public DateTime? LastModificationDate { get; set; }

    public int CreatedBy { get; set; }

    public virtual ICollection<AvaliacaoEvaluation> AvaliacaoEvaluations { get; set; } = new List<AvaliacaoEvaluation>();

    public virtual ICollection<AvaliacaoQuestion> AvaliacaoQuestions { get; set; } = new List<AvaliacaoQuestion>();
}
