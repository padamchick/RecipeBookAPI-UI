package recipes.recipebook.commons;

import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.concurrent.Callable;

@Service
public class TransactionalService {

    private final TransactionTemplate transactionTemplate;

    public TransactionalService(PlatformTransactionManager transactionManager) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
    }

    public void run(final Runnable runnable) {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                runnable.run();
            }
        });
    }

    public <T> T run(final Callable<T> callable) {
        return transactionTemplate.execute(status -> {
            try {
                return callable.call();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
}
