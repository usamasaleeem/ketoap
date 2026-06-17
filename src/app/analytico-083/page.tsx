// app/analytico/page.tsx
"use client";

import { useState, useEffect } from "react";

// No external imports - pure CSS and React

interface OnboardingSession {
    _id: string;
    data: {
        name?: string;
        email?: string;
        age: number;
        gender: string;
        height: number;
        weight: number;
        targetWeight: number;
        goal: string;
        activityLevel: string;
        dietPreference: string;
        allergies: string[];
        medicalConditions: string[];
        favoriteFoods: string[];
        foodsToAvoid: string[];
        mealsPerDay: number;
        planLength: number;
    };
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    count: number;
    data: OnboardingSession[];
    message: string;
    timestamp: string;
}

// Inline styles
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e9ecef',
        padding: '20px 0',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
    },
    headerContent: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '15px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto 30px',
        padding: '0 20px'
    },
    statCard: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
    },
    statLabel: {
        fontSize: '13px',
        color: '#6c757d',
        marginBottom: '8px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px'
    },
    statValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#212529'
    },
    chartGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto 30px',
        padding: '0 20px'
    },
    chartCard: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef'
    },
    chartTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#212529'
    },
    chartItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 0',
        borderBottom: '1px solid #f1f3f5'
    },
    chartLabel: {
        fontSize: '14px',
        color: '#495057',
        textTransform: 'capitalize' as const
    },
    chartBar: {
        height: '8px',
        borderRadius: '4px',
        backgroundColor: '#e9ecef',
        overflow: 'hidden',
        flex: 1,
        margin: '0 12px'
    },
    chartBarFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '4px',
        transition: 'width 0.6s ease'
    },
    chartCount: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#212529',
        minWidth: '30px',
        textAlign: 'right' as const
    },
    tableContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        border: '1px solid #e9ecef',
        overflow: 'hidden',
        padding: '0 20px'
    },
    tableHeader: {
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e9ecef',
        flexWrap: 'wrap' as const,
        gap: '10px'
    },
    tableTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#212529'
    },
    tableSubtitle: {
        fontSize: '14px',
        color: '#6c757d',
        marginTop: '4px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        fontSize: '14px'
    },
    th: {
        padding: '12px 8px',
        textAlign: 'left' as const,
        fontWeight: '600',
        color: '#495057',
        borderBottom: '2px solid #e9ecef',
        backgroundColor: '#f8f9fa',
        position: 'sticky' as const,
        top: 0,
        zIndex: 10
    },
    td: {
        padding: '10px 8px',
        borderBottom: '1px solid #f1f3f5',
        color: '#212529'
    },
    badge: {
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '600',
        textTransform: 'capitalize' as const,
        backgroundColor: '#e9ecef',
        color: '#495057'
    },
    badgePrimary: {
        backgroundColor: '#667eea',
        color: '#ffffff'
    },
    badgeSuccess: {
        backgroundColor: '#51cf66',
        color: '#ffffff'
    },
    badgeWarning: {
        backgroundColor: '#fcc419',
        color: '#212529'
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column' as const,
        gap: '20px'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #e9ecef',
        borderTop: '4px solid #667eea',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column' as const,
        gap: '15px'
    },
    errorCard: {
        backgroundColor: '#fff5f5',
        padding: '30px',
        borderRadius: '12px',
        border: '1px solid #ff6b6b',
        maxWidth: '400px',
        textAlign: 'center' as const
    },
    errorTitle: {
        color: '#c92a2a',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '10px'
    },
    errorText: {
        color: '#495057',
        fontSize: '14px',
        marginBottom: '20px'
    },
    button: {
        padding: '10px 24px',
        backgroundColor: '#667eea',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    buttonHover: {
        backgroundColor: '#5a67d8'
    },
    buttonOutline: {
        padding: '8px 16px',
        backgroundColor: 'transparent',
        color: '#495057',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        fontSize: '13px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    refreshButton: {
        padding: '8px 16px',
        backgroundColor: '#667eea',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    badgeDanger: {
        backgroundColor: '#ff6b6b',
        color: '#ffffff'
    },
    link: {
        color: '#667eea',
        textDecoration: 'none',
        fontSize: '13px'
    },
    warningBanner: {
        backgroundColor: '#fff3cd',
        border: '1px solid #ffc107',
        color: '#856404',
        padding: '12px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        maxWidth: '1200px',
        margin: '0 auto 20px',
        textAlign: 'center' as const,
        fontSize: '13px'
    }
};

export default function AnalyticoPage() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    // ⚠️ INSECURE - Calls the unsecure API endpoint
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // 🔓 INSECURE API CALL - No authentication
            const response = await fetch("/api/onboarding/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load data");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const calculateStats = () => {
        if (!data?.data?.length) return null;

        const sessions = data.data;
        const total = sessions.length;

        const avgAge = sessions.reduce((sum, s) => sum + s.data.age, 0) / total;
        const avgWeight = sessions.reduce((sum, s) => sum + s.data.weight, 0) / total;
        const avgHeight = sessions.reduce((sum, s) => sum + s.data.height, 0) / total;

        const genderCount = sessions.reduce((acc, s) => {
            acc[s.data.gender] = (acc[s.data.gender] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const goalCount = sessions.reduce((acc, s) => {
            acc[s.data.goal] = (acc[s.data.goal] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const dietCount = sessions.reduce((acc, s) => {
            acc[s.data.dietPreference] = (acc[s.data.dietPreference] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            total,
            avgAge: Math.round(avgAge),
            avgWeight: Math.round(avgWeight * 10) / 10,
            avgHeight: Math.round(avgHeight),
            genderCount,
            goalCount,
            dietCount,
        };
    };

    const stats = calculateStats();

    // Loading State
    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner} />
                <p style={{ color: '#6c757d', fontSize: '14px' }}>Loading user data...</p>
                <p style={{ color: '#adb5bd', fontSize: '12px' }}>Fetching from insecure endpoint</p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div style={styles.errorContainer}>
                <div style={styles.errorCard}>
                    <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
                    <h3 style={styles.errorTitle}>Error Loading Data</h3>
                    <p style={styles.errorText}>{error}</p>
                    <button
                        style={styles.button}
                        onClick={handleRefresh}
                        onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.buttonHover)}
                        onMouseOut={(e) => Object.assign(e.currentTarget.style, { backgroundColor: '#667eea' })}
                    >
                        🔄 Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* ⚠️ INSECURE WARNING */}
            <div style={styles.warningBanner}>
                ⚠️ <strong>INSECURE ROUTE</strong> - This page displays all user data without authentication.
                Data is exposed via the unsecure API endpoint.
            </div>

            {/* Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.headerLeft}>
                        <span style={{ fontSize: '28px' }}>📊</span>
                        <div>
                            <div style={styles.logo}>Analytics Dashboard</div>
                            <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '2px' }}>
                                🔓 Insecure Mode | {data?.timestamp ? new Date(data.timestamp).toLocaleString() : 'N/A'}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ backgroundColor: '#ff6b6b', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold' }}>
                            🔓 INSECURE
                        </span>
                        <span style={{ fontSize: '14px', color: '#495057' }}>
                            👤 {data?.count || 0} Users
                        </span>
                        <button
                            style={styles.refreshButton}
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            {refreshing ? '⏳' : '🔄'} Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats */}
            {stats && (
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>👥 Total Users</div>
                        <div style={styles.statValue}>{stats.total}</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>📅 Average Age</div>
                        <div style={styles.statValue}>{stats.avgAge} yrs</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>⚖️ Avg Weight</div>
                        <div style={styles.statValue}>{stats.avgWeight} kg</div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statLabel}>📏 Avg Height</div>
                        <div style={styles.statValue}>{stats.avgHeight} cm</div>
                    </div>
                </div>
            )}

            {/* Charts */}
            {stats && (
                <div style={styles.chartGrid}>
                    {/* Gender Chart */}
                    <div style={styles.chartCard}>
                        <div style={styles.chartTitle}>👤 Gender Distribution</div>
                        {Object.entries(stats.genderCount).map(([gender, count]) => (
                            <div key={gender} style={styles.chartItem}>
                                <span style={styles.chartLabel}>{gender}</span>
                                <div style={styles.chartBar}>
                                    <div style={{
                                        ...styles.chartBarFill,
                                        width: `${(count / stats.total) * 100}%`
                                    }} />
                                </div>
                                <span style={styles.chartCount}>{count}</span>
                            </div>
                        ))}
                    </div>

                    {/* Goals Chart */}
                    <div style={styles.chartCard}>
                        <div style={styles.chartTitle}>🎯 User Goals</div>
                        {Object.entries(stats.goalCount).map(([goal, count]) => (
                            <div key={goal} style={styles.chartItem}>
                                <span style={styles.chartLabel}>{goal.replace('-', ' ')}</span>
                                <div style={styles.chartBar}>
                                    <div style={{
                                        ...styles.chartBarFill,
                                        width: `${(count / stats.total) * 100}%`
                                    }} />
                                </div>
                                <span style={styles.chartCount}>{count}</span>
                            </div>
                        ))}
                    </div>

                    {/* Diet Chart */}
                    <div style={styles.chartCard}>
                        <div style={styles.chartTitle}>🍽️ Diet Preferences</div>
                        {Object.entries(stats.dietCount).map(([diet, count]) => (
                            <div key={diet} style={styles.chartItem}>
                                <span style={styles.chartLabel}>{diet}</span>
                                <div style={styles.chartBar}>
                                    <div style={{
                                        ...styles.chartBarFill,
                                        width: `${(count / stats.total) * 100}%`
                                    }} />
                                </div>
                                <span style={styles.chartCount}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div style={styles.tableContainer}>
                <div style={styles.tableHeader}>
                    <div>
                        <div style={styles.tableTitle}>📋 All User Data</div>
                        <div style={styles.tableSubtitle}>Complete onboarding data exposed via insecure API</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{ fontSize: '12px', color: '#6c757d' }}>
                            Total: {data?.count || 0} records
                        </span>
                    </div>
                </div>

                <div style={{ overflowX: 'auto', maxHeight: '600px', overflowY: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>#</th>

                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Age</th>
                                <th style={styles.th}>Gender</th>
                                <th style={styles.th}>Height</th>
                                <th style={styles.th}>Weight</th>
                                <th style={styles.th}>Target</th>
                                <th style={styles.th}>Goal</th>
                                <th style={styles.th}>Activity</th>
                                <th style={styles.th}>Diet</th>
                                <th style={styles.th}>Meals</th>
                                <th style={styles.th}>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.map((session, index) => {
                                const goalColors = {
                                    'weight-loss': styles.badgeWarning,
                                    'weight-gain': styles.badgePrimary,
                                    'maintain': styles.badgeSuccess,
                                    'muscle-gain': styles.badge,
                                    'fat-loss': styles.badgeDanger,
                                };
                                const goalStyle = goalColors[session.data.goal as keyof typeof goalColors] || styles.badge;

                                return (
                                    <tr key={session._id}>
                                        <td style={styles.td}>{index + 1}</td>

                                        <td style={styles.td}>{session.data?.email}</td>
                                        <td style={styles.td}>{session.data.age}</td>
                                        <td style={styles.td}>
                                            <span style={styles.badge}>{session.data.gender}</span>
                                        </td>
                                        <td style={styles.td}>{session.data.height} cm</td>
                                        <td style={styles.td}>{session.data.weight} kg</td>
                                        <td style={styles.td}>{session.data.targetWeight} kg</td>
                                        <td style={styles.td}>
                                            <span style={{ ...styles.badge, ...goalStyle }}>
                                                {session.data.goal.replace('-', ' ')}
                                            </span>
                                        </td>
                                        <td style={styles.td}>{session.data.activityLevel.replace('-', ' ')}</td>
                                        <td style={styles.td}>
                                            <span style={styles.badge}>{session.data.dietPreference}</span>
                                        </td>
                                        <td style={styles.td}>{session.data.mealsPerDay}</td>
                                        <td style={{ ...styles.td, fontSize: '12px', color: '#6c757d' }}>
                                            {new Date(session.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Insecure endpoint info */}
            <div style={{
                maxWidth: '1200px',
                margin: '20px auto 0',
                padding: '20px',
                backgroundColor: '#fff3cd',
                borderRadius: '8px',
                border: '1px solid #ffc107',
                textAlign: 'center' as const
            }}>
                <p style={{ fontSize: '13px', color: '#856404' }}>
                    🔓 This page uses the insecure API endpoint <code style={{ backgroundColor: '#ffeeba', padding: '2px 8px', borderRadius: '4px' }}>GET /api/onboarding/insecure</code><br />
                    All user data is exposed without authentication, authorization, or rate limiting.
                </p>
            </div>
        </div>
    );
}