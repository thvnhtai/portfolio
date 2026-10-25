import type { CaseBase } from '../../content/types';
import { useLang } from '../../i18n/LangProvider';
import cs from './Mocks.module.css';
import { DiffMock } from './DiffMock';
import { InvoiceMock } from './InvoiceMock';
import { LedgerMock } from './LedgerMock';
import { MfeMock } from './MfeMock';
import { VoucherMock } from './VoucherMock';

const BODY = { ledger: LedgerMock, invoice: InvoiceMock, diff: DiffMock, voucher: VoucherMock, mfe: MfeMock };

export function MockUi({ kind, url }: { kind: CaseBase['mock']; url: string }) {
  const { t } = useLang();
  const Body = BODY[kind];
  return (
    <>
      <div className={cs.browser}>
        <div className={cs.chrome}><i /><i /><i /><span>{url}</span></div>
        <div className={cs.scr}><div aria-hidden="true"><Body /></div></div>
      </div>
      <p className={cs.note}>{t.caseUi.note}</p>
    </>
  );
}
