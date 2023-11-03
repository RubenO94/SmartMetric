using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AvaliacaoUniqueAnsTemplate
{
    public int UniqueAnswerTemplateId { get; set; }

    public string Title { get; set; } = null!;

    public DateTime CreationDate { get; set; }

    public DateTime? LastModificationDate { get; set; }

    public int CreatedBy { get; set; }

    public virtual ICollection<AvaliacaoQuestion> AvaliacaoQuestions { get; set; } = new List<AvaliacaoQuestion>();

    public virtual ICollection<AvaliacaoUniqueAn> AvaliacaoUniqueAns { get; set; } = new List<AvaliacaoUniqueAn>();
}
