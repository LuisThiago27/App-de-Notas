import { db } from "./SQLite";

export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " +
        "Notas " + 
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}

export async function adicionaNotas(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?,?,?);", [nota.titulo,
            nota.categoria, nota.texto], () => {
                resolve("Nota adicionada com sucesso!")
            })
        })  
    })
}

export async function atualizaNotas(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [nota.titulo,
            nota.categoria, nota.texto, nota.id], () => {
                resolve("Nota atualizada com sucesso!")
            })
        })  
    })
}

export async function removeNotas(nota) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [nota.id], () => {
                resolve("Nota removida com sucesso!")
            })
        })  
    })
}

export async function buscaNotas() {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Notas;", [], (transaction, resultado) => {
                resolve(resultado.rows._array)
            })
        })  
    })
}

export async function filtraPorCategoria(categoria) {
    return new Promise((resolve) => {
        db.transaction((transaction) => {
            transaction.executeSql("SELECT * FROM Notas WHERE categoria = ?;", [categoria], (transaction, resultado) => {
                resolve(resultado.rows._array)
            })
        })  
    })
}