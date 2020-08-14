/* El tipo Currency lo definimos de esta manera, solo puede ser MXN o USD */
type Currency = 'MXN' | 'USD';

interface Price {
    number: number,
    currency: Currency /* Este lo creamos */
}

/* interface Estructura que define los tipos de datos */
interface ExpenseItem { 
    id?: number,
    title: string,
    cost: Price /* Este tipo de dato lo vamos a crear */
}

interface IExpenses {
    expenses: ArrayList<ExpenseItem>,/* los <> para indicar que es de cierto tipo */
    finalCurrency: Currency,
    /* métodos */
    add(item: ExpenseItem): boolean,
    get(index:number): ExpenseItem|null, /* puede existir o no */
    getTotal(): string,
    remove(id:number): boolean
}

/* Especificamos que la variable T es de generico */
class ArrayList<T> {
    private items:T[]; /* esta clase tendrá un arreglo de elementos que sea de tipo T, si dejamos así lo debemos inicializar en el constructor  */
    constructor() {
        this.items = [] ;
    }

    add(item: T):void {
        this.items.push(item);
    }

    get(index:number): T|null {
        const item: T[] = this.items.filter((x:T, i: number) => {/* para regresar el elemento */
            return i === index;
        });

        if(item.length === 0) {
            return null;
        } else{
            return item[0];
        }
    }

    createFrom(value: T[]):void {
        this.items = [...value];
    }

    getAll():T[] {
        return this.items;
    }
}

class Expenses implements IExpenses{ /* implements para inidicar la interfaz y hacemos click en la clase*/
    expenses: ArrayList<ExpenseItem>;
    finalCurrency: Currency;
    private count = 0; /* Para los IDs */
    constructor(currency: Currency) {
        this.finalCurrency = currency;
        this.expenses = new ArrayList<ExpenseItem>(); /* creando objeto de tipo arraylist, arraylist es una clase generica */
    }
    add(item: ExpenseItem): boolean {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index:number): ExpenseItem | null {
        return this.expenses.get(index);
    }
    getItems(): ExpenseItem[] { /* Se pueden crear más, sin necesidad de que esté solo en la interfaz */
       return this.expenses.getAll(); 
    }
    getTotal(): string {
        const total = this.getItems().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);

        return `${this.finalCurrency} $${total.toFixed(2).toString()}` /* Redondear tofixed */
    }
    remove(id: number): boolean {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });

        this.expenses.createFrom(items);
        return true;
    }

    private convertCurrency(item: ExpenseItem, currency: Currency): number {
        switch(item.cost.currency) {
            case 'USD':
                switch(currency) {
                    case 'MXN':
                        return item.cost.number * 22;
                    break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'MXN':
                switch(currency) {
                    case 'USD':
                        return item.cost.number / 22;
                    break;
                    default:
                        return item.cost.number;
                    }
                break;   
            default:
                return 0;
                
        }
    }
}