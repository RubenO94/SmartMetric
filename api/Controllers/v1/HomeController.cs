using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    /// <summary>
    /// Todas as chamadas relacionadas com a pagina inicial do SmartMetric
    /// </summary>
    [ApiVersion("1.0")]
    public class HomeController : CustomControllerBase
    {
        /// <summary>
        /// Um teste de descricção do endpoint
        /// </summary>
        /// <returns>
        /// um teste</returns>
        [HttpGet("formTemplates")]
        [Produces("application/json")]
        public ActionResult<String[]> GetFormTemplates()
        {
            var strings = new string[]{
                "Home",
                "Register",
                "Application",
                "Test",
            };
            return strings;
        }

        /// <summary>
        /// COMENTAR
        /// </summary>
        /// <returns></returns>
        [HttpGet("scaleTemplates")]
        [Produces("application/json")]
        public ActionResult<String[]> GetScaleTemplates()
        {
            var strings = new string[]{
                "Home",
                "Register",
                "Application",
                "Test",
            };
            return strings;
        }

        /// <summary>
        /// COMENTAR
        /// </summary>
        /// <returns></returns>
        [HttpGet("uniqueAnwserTemplates")]
        [Produces("application/json")]
        public ActionResult<String[]> GetUniqueAnwserTemplates()
        {
            var strings = new string[]{
                "Home",
                "Register",
                "Application",
                "Test",
            };
            return strings;
        }
    }
}