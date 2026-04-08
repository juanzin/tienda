using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tienda.Context;
using tienda.models;

namespace tienda.controllers
{
    [Route("api/productos")]
    [ApiController]
    public class productoController : ControllerBase
    {

        private readonly AppDBContext context;
        public productoController(AppDBContext context) { 
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<string>> Get() {
            try
            {
                var productos = context.productos.ToList();
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet("{Id}", Name = "GetProducto")]
        public ActionResult Get(int id)
        {
            try
            {
                var producto = context.productos.FirstOrDefault(producto => producto.Id == id);
                return Ok(producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult Post([FromBody] Productos producto)
        {
            try
            {
                context.productos.Add(producto);
                context.SaveChanges();
                return CreatedAtRoute("GetProducto", new { Id = producto.Id }, producto);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        public ActionResult Put(int id, [FromBody] Productos producto)
        {
            try
            {
                if (producto.Id == id)
                {
                    context.Entry(producto).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetProducto", new { Id = producto.Id }, producto);

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
                var producto = context.productos.FirstOrDefault(g => g.Id == id);
                if (producto != null)
                {
                    context.productos.Remove(producto);
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
