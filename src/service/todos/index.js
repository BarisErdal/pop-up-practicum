import service from "../instance";

export const read = async () =>
  service.get("todos").then((response) => {
    return response;
  })


export const update = (id, payload) =>
  service.put(`todos/${id}`, payload)

export const create = (payload) =>
  service.post("todos", payload)
  

export const destroy = (id) => service.delete(`todos/${id}`)


