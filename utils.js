module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        today.getDate()
        birthDate.getDate()
        
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
            age = age - 1
        }
    
        return age
    },

    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            day,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },

    graduation: function(value) {
        if (value == 1) return "Ensino Médio Completo"
        
        if (value == 2) return "Ensino Superior Completo"

        if (value == 3) return "Mestrado e Doutorado"

    },

    grade: function(value) {
        let expr = value
        switch(expr) {
            case "5EF":
                return "5º ano do Ensino Fundamental"
            case "6EF":
                return "6º ano do Ensino Fundamental"
            case "7EF":
                return "7º ano do Ensino Fundamental"
            case "8EF":
                return "8º ano do Ensino Fundamental"
            case "9EF":
                return "9º ano do Ensino Médio"
            case "1EM":
                return "1º ano do Ensino Médio"
            case "2EM":
                return "2º ano do Ensino Médio"
            case "3EM":
                return "3º ano do Ensino Médio"
        }
    }

}