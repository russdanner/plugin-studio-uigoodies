/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import type { RepoConfigSetting, RepoHealthMetric, RepoHealthReport } from './devContentOpsApi';

type ConcernLevel = 'ok' | 'watch' | 'elevated' | 'critical';

function concernLevel(concern: number): ConcernLevel {
  if (concern >= 30) {
    return 'critical';
  }
  if (concern >= 10) {
    return 'elevated';
  }
  if (concern >= 3) {
    return 'watch';
  }
  return 'ok';
}

function concernLabel(level: ConcernLevel): string {
  switch (level) {
    case 'critical':
      return 'Critical';
    case 'elevated':
      return 'Elevated';
    case 'watch':
      return 'Watch';
    default:
      return 'OK';
  }
}

function concernEmoji(level: ConcernLevel): string {
  switch (level) {
    case 'critical':
      return '🔴';
    case 'elevated':
      return '🟠';
    case 'watch':
      return '🟡';
    default:
      return '🟢';
  }
}

function concernBadge(concern: number): string {
  const level = concernLevel(concern);
  return `${concernEmoji(level)} ${concernLabel(level)} (${concern})`;
}

function escapeMdCell(value: string | number | undefined | null): string {
  if (value === undefined || value === null) {
    return '—';
  }
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim();
}

function groupMetrics(metrics: RepoHealthMetric[]): Array<{ group: string; metrics: RepoHealthMetric[] }> {
  const order: string[] = [];
  const map = new Map<string, RepoHealthMetric[]>();
  metrics.forEach((metric) => {
    const group = metric.group?.trim() || 'Metrics';
    if (!map.has(group)) {
      map.set(group, []);
      order.push(group);
    }
    map.get(group)!.push(metric);
  });
  return order.map((group) => ({ group, metrics: map.get(group)! }));
}

function groupConfigSettings(settings: RepoConfigSetting[]): Array<{ group: string; settings: RepoConfigSetting[] }> {
  const order: string[] = [];
  const map = new Map<string, RepoConfigSetting[]>();
  settings.forEach((setting) => {
    const group = setting.group?.trim() || 'Configuration';
    if (!map.has(group)) {
      map.set(group, []);
      order.push(group);
    }
    map.get(group)!.push(setting);
  });
  return order.map((group) => ({ group, settings: map.get(group)! }));
}

function sourceLabel(setting: RepoConfigSetting): string {
  switch (setting.source) {
    case 'local':
      return setting.sourceDetail || '.git/config';
    case 'global':
      return setting.sourceDetail || 'global gitconfig';
    case 'system':
      return setting.sourceDetail || 'system gitconfig';
    case 'runtime':
      return 'git count-objects';
    case 'default':
      return 'Git default';
    default:
      return setting.sourceDetail || setting.source || '—';
  }
}

function groupEmoji(groupConcern: number): string {
  const level = concernLevel(groupConcern);
  if (level === 'critical') {
    return '🚨';
  }
  if (level === 'elevated') {
    return '⚠️';
  }
  if (level === 'watch') {
    return '👀';
  }
  return '✨';
}

export function buildRepoHealthReportMarkdown(
  report: RepoHealthReport,
  opts: { siteId: string; siteName?: string }
): string {
  const lines: string[] = [];
  const generatedAt = new Date();
  const overall = report.overallConcern ?? 0;
  const overallLevel = concernLevel(overall);
  const projectLabel = opts.siteName ? `${opts.siteName} (${opts.siteId})` : opts.siteId;
  const metrics = report.metrics ?? [];
  const settings = report.repoConfig?.settings ?? [];
  const metricGroups = groupMetrics(metrics);
  const configGroups = groupConfigSettings(settings);

  const attentionMetrics = metrics.filter((m) => (m.concern ?? 0) > 0);
  const attentionSettings = settings.filter((s) => (s.concern ?? 0) > 0 || s.deviatesFromRecommended);

  lines.push('# 🏥 Repository Health Report');
  lines.push('');
  lines.push(
    `> 📅 **Generated:** ${generatedAt.toLocaleString()} · 🛠️ **DevContentOps Tools** · CrafterCMS Studio`
  );
  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 📋 Executive summary');
  lines.push('');
  lines.push('| Field | Value |');
  lines.push('| --- | --- |');
  lines.push(`| 🗂️ **Project** | ${escapeMdCell(projectLabel)} |`);
  lines.push(`| ${concernEmoji(overallLevel)} **Overall health** | ${escapeMdCell(concernBadge(overall))} |`);
  if (report.summary) {
    lines.push(`| 📝 **Summary** | ${escapeMdCell(report.summary)} |`);
  }
  if (report.mode) {
    lines.push(`| 🔬 **Analysis mode** | ${escapeMdCell(report.mode)} |`);
  }
  if (report.repoPath) {
    lines.push(`| 📁 **Repository path** | \`${escapeMdCell(report.repoPath)}\` |`);
  }
  if (report.thresholdProfileLabel) {
    lines.push(`| 📏 **Threshold profile** | ${escapeMdCell(report.thresholdProfileLabel)} |`);
  }
  lines.push(`| 📊 **Metrics tracked** | ${metrics.length} |`);
  lines.push(`| ⚙️ **Config settings** | ${settings.length} |`);
  lines.push(`| ⚡ **Items needing attention** | ${attentionMetrics.length + attentionSettings.length} |`);
  lines.push('');

  if (attentionMetrics.length > 0 || attentionSettings.length > 0) {
    lines.push('### 🎯 Highlights');
    lines.push('');
    attentionMetrics.slice(0, 8).forEach((metric) => {
      lines.push(
        `- ${concernEmoji(concernLevel(metric.concern ?? 0))} **${metric.label}:** ${escapeMdCell(metric.value)}`
      );
    });
    attentionSettings.slice(0, 8).forEach((setting) => {
      const flag = setting.deviatesFromRecommended ? '⚠️ Non-recommended' : concernBadge(setting.concern ?? 0);
      lines.push(`- ${flag} **${setting.label}:** \`${escapeMdCell(setting.value)}\``);
    });
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## 📊 Health metrics');
  lines.push('');
  lines.push('_Git-sizer style metrics for object store size, history shape, and reference graph health._');
  lines.push('');

  if (metricGroups.length === 0) {
    lines.push('_No metrics were returned._');
    lines.push('');
  } else {
    metricGroups.forEach(({ group, metrics: groupMetricsList }) => {
      const groupConcern = Math.max(0, ...groupMetricsList.map((m) => m.concern ?? 0));
      lines.push(`### ${groupEmoji(groupConcern)} ${group}`);
      lines.push('');
      lines.push('| Metric | Value | Status | Object ID |');
      lines.push('| --- | --- | --- | --- |');
      groupMetricsList.forEach((metric) => {
        lines.push(
          `| ${escapeMdCell(metric.label)} | **${escapeMdCell(metric.value)}** | ${escapeMdCell(
            concernBadge(metric.concern ?? 0)
          )} | ${escapeMdCell(metric.objectId?.slice(0, 12) || '—')} |`
        );
      });
      lines.push('');
    });
  }

  lines.push('---');
  lines.push('');
  lines.push('## ⚙️ Repository configuration');
  lines.push('');
  lines.push('_Git settings and runtime object-store stats that affect GC, repack, status, and commit performance._');
  lines.push('');

  if (configGroups.length === 0) {
    lines.push('_No configuration settings were returned._');
    lines.push('');
  } else {
    configGroups.forEach(({ group, settings: groupSettings }) => {
      const groupConcern = Math.max(0, ...groupSettings.map((s) => s.concern ?? 0));
      const hasDeviations = groupSettings.some((s) => s.deviatesFromRecommended);
      const headerEmoji = hasDeviations ? '⚠️' : groupEmoji(groupConcern);
      lines.push(`### ${headerEmoji} ${group}`);
      lines.push('');
      lines.push('| Setting | Value | Recommended | Source | Performance | Status |');
      lines.push('| --- | --- | --- | --- | --- | --- |');
      groupSettings.forEach((setting) => {
        const statusParts: string[] = [concernBadge(setting.concern ?? 0)];
        if (setting.deviatesFromRecommended) {
          statusParts.push('⚠️ Non-recommended');
        }
        const label = setting.description
          ? `${setting.label} — _${escapeMdCell(setting.description)}_`
          : setting.label;
        lines.push(
          `| ${escapeMdCell(label)} | \`${escapeMdCell(setting.value)}\` | ${escapeMdCell(
            setting.recommendedValue || '—'
          )} | ${escapeMdCell(sourceLabel(setting))} | ${escapeMdCell(setting.performanceNote || '—')} | ${escapeMdCell(
            statusParts.join(' · ')
          )} |`
        );
      });
      lines.push('');
    });
  }

  lines.push('---');
  lines.push('');
  lines.push('## 💡 Recommendations');
  lines.push('');

  if (attentionMetrics.length === 0 && attentionSettings.length === 0) {
    lines.push('✅ **Looking good!** No metrics or settings flagged above baseline concern.');
  } else {
    lines.push('Prioritize items marked 🟠 Elevated, 🔴 Critical, or ⚠️ Non-recommended:');
    lines.push('');
    if (attentionMetrics.length > 0) {
      lines.push('### Metrics');
      lines.push('');
      attentionMetrics
        .sort((a, b) => (b.concern ?? 0) - (a.concern ?? 0))
        .forEach((metric) => {
          lines.push(
            `- ${concernEmoji(concernLevel(metric.concern ?? 0))} **${metric.label}** — ${escapeMdCell(metric.value)} (${metric.concern ?? 0} concern)`
          );
        });
      lines.push('');
    }
    if (attentionSettings.length > 0) {
      lines.push('### Configuration');
      lines.push('');
      attentionSettings
        .sort((a, b) => (b.concern ?? 0) - (a.concern ?? 0))
        .forEach((setting) => {
          const rec = setting.recommendedValue ? ` → recommended \`${setting.recommendedValue}\`` : '';
          const dev = setting.deviatesFromRecommended ? ' ⚠️' : '';
          lines.push(
            `- ${concernEmoji(concernLevel(setting.concern ?? 0))}${dev} **${setting.label}** — \`${escapeMdCell(setting.value)}\`${rec}`
          );
        });
      lines.push('');
    }
    lines.push(
      '_Optimize operations reorganize or prune Git storage — they do not remove committed site files from branches. Use **Git log → Trim History** to rewrite history._'
    );
  }

  lines.push('');
  lines.push('---');
  lines.push('');
  lines.push('## 📎 Report legend');
  lines.push('');
  lines.push('| Symbol | Meaning |');
  lines.push('| --- | --- |');
  lines.push('| 🟢 OK | Concern score 0–2 |');
  lines.push('| 🟡 Watch | Concern score 3–9 |');
  lines.push('| 🟠 Elevated | Concern score 10–29 |');
  lines.push('| 🔴 Critical | Concern score 30+ |');
  lines.push('| ⚠️ Non-recommended | Setting differs from CrafterCMS sandbox recommendation |');
  lines.push('');
  lines.push(`_Report ID: ${opts.siteId} · ${generatedAt.toISOString()}_`);

  return lines.join('\n');
}

function triggerBlobDownload(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function downloadRepoHealthReportMarkdown(
  report: RepoHealthReport,
  opts: { siteId: string; siteName?: string }
): void {
  const markdown = buildRepoHealthReportMarkdown(report, opts);
  const date = new Date().toISOString().slice(0, 10);
  const safeSite = opts.siteId.replace(/[^a-zA-Z0-9_-]+/g, '-');
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  triggerBlobDownload(`${safeSite}-repo-health-${date}.md`, blob);
}
