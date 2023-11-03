using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AvaliacaoEvaluation
{
    public int EvaluationId { get; set; }

    public int FormTemplateId { get; set; }

    public int CreatedBy { get; set; }

    public DateTime? DateStart { get; set; }

    public DateTime? DateEnd { get; set; }

    public string? Title { get; set; }

    public bool Status { get; set; }

    public virtual AvaliacaoFormTemplate FormTemplate { get; set; } = null!;
}
