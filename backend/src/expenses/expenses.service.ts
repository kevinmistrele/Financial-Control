import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}
  create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: createExpenseDto,
    })
  }

  async findAll(page: number, limit: number, order: "asc" | "desc") {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        this.prisma.expense.findAll({
          skip: skip,
          take: limit,
          orderBy: { createdAt: order },
        }),
        this.prisma.expense.count(),
    ]);
    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: string) { return this.prisma.findUnique({ where: id}) }

  update(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data: updateExpenseDto,
    });
  }

  removeMany(ids: number[]) {
    return this.prisma.expense.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }

  async generateReport(days: number) {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - days);

    const expenses = await this.prisma.expense.findMany({
      where: {
        createdAt: {
          gte: sinceDate,
        },
      },
      orderBy: {createdAt: 'desc'},
    });

    const dailyMap = new Map<string, number>();
    let total = 0;

    expenses.forEach(expense => {
        const dateKey = expense.createdAt.toISOString().split('T')[0];
        const amount = Number(expense.amount);

    total += amount;

    if(dailyMap.has(dateKey)) {
      const currentTotal = dailyMap.get(dateKey) ?? 0;
      dailyMap.set(dateKey, currentTotal + amount);
    }else{
      dailyMap.set(dateKey, amount);
    }
    });

    const dailyBreakdown = Array.from(dailyMap, ([date, amount]) => ({ date, amount }));

    return {
      period: `${days} days`,
      totalSpent: total,
      dailyBreakdown,
      rawCount: expenses.length,
    };

  }

  remove(id: string[]) { return `This action removes a #${id} expense`; }
}
