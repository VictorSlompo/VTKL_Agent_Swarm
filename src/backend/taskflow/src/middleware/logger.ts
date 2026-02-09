import { Request, Response, NextFunction } from 'express';

// Simple request logger middleware
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Capture original send function
  const originalSend = res.send;
  
  // Override send function to log response details
  res.send = function(body) {
    const duration = Date.now() - start;
    
    // Log request details
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`, {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      contentLength: res.get('Content-Length'),
    });
    
    // Call original send function
    return originalSend.call(this, body);
  };
  
  next();
};

// Security headers logging (optional)
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  // Log potentially suspicious requests
  const suspiciousPatterns = [
    /\.\.\//,  // Path traversal
    /script/i, // Script injection
    /union.*select/i, // SQL injection
    /<.*>/,    // HTML injection
  ];
  
  const requestData = JSON.stringify({
    body: req.body,
    query: req.query,
    params: req.params,
  });
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(requestData) || pattern.test(req.url)
  );
  
  if (isSuspicious) {
    console.warn(`[SECURITY] Suspicious request detected:`, {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      body: req.body,
      timestamp: new Date().toISOString(),
    });
  }
  
  next();
};