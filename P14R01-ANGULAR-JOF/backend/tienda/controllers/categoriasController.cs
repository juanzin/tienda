using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tienda.Context;
using tienda.models;

namespace tienda.controllers
{
    [Route("api/categorias")]
    [ApiController]
    public class categoriasController : ControllerBase
    {
        private readonly AppDBContext context;
        public categoriasController(AppDBContext context) { 
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<string>> Get() {
            try
            {
                return Ok(context.categorias.ToList());
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("{Id}", Name = "GetCategoria")]
        public ActionResult Get(int id)
        {
            try
            {
                var categoria = context.categorias.FirstOrDefault(gestor => gestor.Id == id);
                return Ok(categoria);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Categorias categoria)
        {
            try
            {
                context.categorias.Add(categoria);
                context.SaveChanges();
                return CreatedAtRoute("GetCategoria", new { Id = categoria.Id }, categoria);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public ActionResult Put(int id, [FromBody] Categorias categoria)
        {
            try
            {
                if (categoria.Id == id)
                {
                    context.Entry(categoria).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetCategoria", new { Id = categoria.Id }, categoria);

                }
                else
                {
                    return BadRequest();

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            try
            {
                var categoria = context.categorias.FirstOrDefault(g => g.Id == id);
                if (categoria != null)
                {
                    context.categorias.Remove(categoria);
                    context.SaveChanges();

                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
