import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Dummy data for preview
const PREVIEW_DATA = {
  monthlyReport: {
    userName: "John Doe",
    type: "monthly-report",
    data: {
      month: "December",
      stats: {
        totalIncome: 5000,
        totalExpenses: 3500,
        byCategory: {
          housing: 1500,
          groceries: 600,
          transportation: 400,
          entertainment: 300,
          utilities: 700,
        },
      },
      insights: [
        "Your housing expenses are 43% of your total spending - consider reviewing your housing costs.",
        "Great job keeping entertainment expenses under control this month!",
        "Setting up automatic savings could help you save 20% more of your income.",
      ],
    },
  },
  budgetAlert: {
    userName: "John Doe",
    type: "budget-alert",
    data: {
      percentageUsed: 85,
      budgetAmount: 4000,
      totalExpenses: 3400,
    },
  },
};

export default function EmailTemplate({
  userName = "LeGend",
  type = "monthly-report",
  data = PREVIEW_DATA.monthlyReport.data,
}) {
  if (type === "monthly-report") {
    return (
      <Html>
        <Head />
        <Preview>Your Monthly Financial Report</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Monthly Financial Report</Heading>

            <Text style={styles.greeting}>Hello {userName},</Text>
            <Text style={styles.text}>
              Here’s your financial summary for {data?.month}:
            </Text>

            {/* Main Stats */}
            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Total Income</Text>
                <Text style={styles.statValue}>${data?.stats.totalIncome}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Total Expenses</Text>
                <Text style={styles.statValue}>${data?.stats.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Net</Text>
                <Text style={styles.statValue}>
                  ${data?.stats.totalIncome - data?.stats.totalExpenses}
                </Text>
              </div>
            </Section>

            {/* Category Breakdown */}
            {data?.stats?.byCategory && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Expenses by Category</Heading>
                {Object.entries(data?.stats.byCategory).map(
                  ([category, amount]) => (
                    <div key={category} style={styles.row}>
                      <Text style={styles.text}>{category}</Text>
                      <Text style={styles.text}>${amount}</Text>
                    </div>
                  )
                )}
              </Section>
            )}

            {/* AI Insights */}
            {data?.insights && (
              <Section style={styles.section}>
                <Heading style={styles.heading}>Wealth Insights</Heading>
                {data.insights.map((insight, index) => (
                  <Text key={index} style={styles.insightText}>
                    • {insight}
                  </Text>
                ))}
              </Section>
            )}

            <Text style={styles.footer}>
              Thank you for using FinSight AI. Keep tracking your finances for
              better financial health!
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }

  if (type === "budget-alert") {
    return (
      <Html>
        <Head />
        <Preview>Budget Alert</Preview>
        <Body style={styles.body}>
          <Container style={styles.container}>
            <Heading style={styles.title}>Budget Alert</Heading>
            <Text style={styles.greeting}>Hello {userName},</Text>
            <Text style={styles.text}>
              You’ve used {data?.percentageUsed.toFixed()}% of your monthly
              budget.
            </Text>

            <Section style={styles.statsContainer}>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Budget Amount</Text>
                <Text style={styles.statValue}>${data?.budgetAmount}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Spent So Far</Text>
                <Text style={styles.statValue}>${data?.totalExpenses}</Text>
              </div>
              <div style={styles.stat}>
                <Text style={styles.statLabel}>Remaining</Text>
                <Text style={styles.statValue}>
                  ${data?.budgetAmount - data?.totalExpenses}
                </Text>
              </div>
            </Section>

            <Text style={styles.footer}>
              Make sure to review your expenses to stay within your budget. We
              recommend setting up reminders to track your spending.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
}

const styles = {
  body: {
    backgroundColor: "#f8f9fc", // Lighter background for a clean look
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    color: "#333", // Darker text color for readability
  },
  container: {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "8px", // Rounded corners for a modern look
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", // Soft shadow
    maxWidth: "600px", // Ensures the content is not too wide
  },
  title: {
    color: "#2d3748", // Slightly darker for the main title
    fontSize: "36px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  greeting: {
    color: "#2d3748",
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  text: {
    color: "#4a5568", // Softer text color for general content
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "16px",
  },
  section: {
    marginTop: "32px",
    padding: "20px",
    backgroundColor: "#f4f7fa", // Light background for sections
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  heading: {
    color: "#2b6cb0", // A rich blue for section headings
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "12px",
  },
  stat: {
    padding: "14px 20px",
    marginBottom: "16px",
    backgroundColor: "#ffffff",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  statLabel: {
    color: "#4a5568",
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "4px",
  },
  statValue: {
    color: "#2d3748",
    fontSize: "20px",
    fontWeight: "700",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e2e8f0",
  },
  insightText: {
    color: "#2d3748",
    fontSize: "16px",
    marginBottom: "8px",
  },
  footer: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "32px",
    paddingTop: "16px",
    borderTop: "1px solid #e2e8f0",
  },
};
