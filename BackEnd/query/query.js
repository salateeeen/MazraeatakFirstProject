class Query {
    constructor(query, queryObj = {}) {
        this.query = query;
        this.queryObj = queryObj;
    }

    filterObj() {
        const filterObj = { ...this.queryObj }
        delete filterObj["page"]
        delete filterObj["limit"]
        delete filterObj["fields"]
        delete filterObj["sort"]
        delete filterObj["order"]
        return filterObj
    }

    filter() {
        const operators = ["gte", "gt", "lte", "lt", "all", "in", "regex"];
        const number = ["gte", "gt", "lte", "lt"];

        Object.keys(this.filterObj()).forEach(key => {
            Object.keys(this.filterObj()[key] || {}).forEach(op => {

                if (operators.includes(op)) {
                    if (op === "regex") {
                        this.filterObj()[key]["$regex"] = new RegExp(
                            this.filterObj()[key][op],
                            "i"
                        );
                    }
                    else if (number.includes(op)) {
                        this.filterObj()[key]["$" + op] =
                            Number(this.filterObj()[key][op]);
                    }
                    else {
                        this.filterObj()[key]["$" + op] =
                            this.filterObj()[key][op];
                    }

                    delete this.filterObj()[key][op];
                }
            });
        });
        this.query = this.query.where(this.filterObj());
        return this;
    }


    fields() {
        if (this.queryObj.fields) {
            const fields = this.queryObj.fields.split(",").join(" ")
            this.query = this.query.select(fields)
        }
        return this
    }

    sort() {
        if (this.queryObj.sort) {
            const sorts = this.queryObj.sort.split(",").join(" ");

            let sortBy = sorts;


            if (this.queryObj.order === "desc") {
                sortBy = `-${sorts}`;
            }

            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }


    populate(options) {
        this.query = this.query.populate(options);
        return this;
    }

    pagination() {
        const page = this.queryObj.page || 1
        const limit = this.queryObj.limit || 5
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)

        return this
    }
}

module.exports = Query