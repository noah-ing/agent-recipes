type LogLevel = 'info' | 'warn' | 'error'

interface LogMessage {
  timestamp: string
  level: LogLevel
  message: string
  metadata?: Record<string, any>
}

class Logger {
  private static instance: Logger
  
  private constructor() {}
  
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger()
    }
    return Logger.instance
  }

  private formatMessage(level: LogLevel, message: string, metadata?: Record<string, any>): LogMessage {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(metadata && { metadata })
    }
  }

  private log(level: LogLevel, message: string, metadata?: Record<string, any>) {
    const formattedMessage = this.formatMessage(level, message, metadata)
    
    // In production, you would send this to a logging service
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service
      console.log(JSON.stringify(formattedMessage))
    } else {
      console.log(`[${formattedMessage.timestamp}] ${level.toUpperCase()}: ${message}`)
      if (metadata) {
        console.log('Metadata:', metadata)
      }
    }
  }

  info(message: string, metadata?: Record<string, any>) {
    this.log('info', message, metadata)
  }

  warn(message: string, metadata?: Record<string, any>) {
    this.log('warn', message, metadata)
  }

  error(message: string, metadata?: Record<string, any>) {
    this.log('error', message, metadata)
  }
}

export const logger = Logger.getInstance()

